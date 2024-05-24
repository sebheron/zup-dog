import clsx from "clsx";
import {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Illustration } from "react-zdog-alt";
import { Vector } from "zdog";
import useCamera from "@/components/Camera/useCamera";
import DocEvent from "@/components/DocEvent/DocEvent";
import Grid from "@/components/Grid/Grid";
import Model from "@/components/Model/Model";
import useScene from "@/components/Scene/useScene";
import TransformGizmo from "@/components/TransformGizmo/TransformGizmo";
import { ArrowType } from "@/constants/Arrows";
import useDolly from "@/hooks/useDolly";
import CallbackVector from "@/types/CallbackVector";
import ObjectInstanceType from "@/types/ObjectInstanceType";
import VectorType from "@/types/VectorType";
import vector from "@/utils/vector";
import styles from "./Viewport.module.css";

interface Props extends PropsWithChildren {
  objects: ObjectInstanceType[];
}

const Viewport = ({ children, objects }: Props) => {
  const ghostRef = useRef<Record<string, Vector>>({});
  const { registerDolly } = useDolly();
  const { zoom, rotation, position } = useCamera();
  const { selected, select, update, del } = useScene();
  const [arrow, setArrow] = useState<ArrowType | null>(null);
  const [multiSelect, setMultiSelect] = useState(false);

  const getAxisCenter = useCallback(
    (axis: keyof VectorType) => {
      return () =>
        selected.reduce((acc, id) => {
          const obj = objects.find((o) => o.id === id);
          if (!obj) return acc;
          return acc + (obj.props.translate?.[axis] ?? 0);
        }, 0) / selected.length;
    },
    [selected, objects],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (e.buttons !== 1) return;
      select(null);
    },
    [select],
  );

  const handleMoveStart = useCallback(
    (newArrow: ArrowType) => {
      if (!selected || newArrow === arrow) return;
      setArrow(newArrow);
      for (const selection of selected) {
        const obj = objects.find((o) => o.id === selection);
        if (!obj) continue;
        ghostRef.current[obj.id] = new Vector(obj.props.translate ?? {});
      }
      update(selected, (id) => ({
        translate: ghostRef.current[id],
      }));
    },
    [selected, arrow, update, objects],
  );

  const handleMoveEnd = useCallback(() => {
    if (!selected || !arrow) return;
    update(selected, (id) => {
      if (!ghostRef.current[id]) return;
      return {
        translate: {
          x: ghostRef.current[id].x,
          y: ghostRef.current[id].y,
          z: ghostRef.current[id].z,
        },
      };
    });
    ghostRef.current = {};
    setArrow(null);
  }, [selected, arrow, update]);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (e.buttons !== 1 && arrow) {
        handleMoveEnd();
        return;
      }
      const mouseVector = vector.moveWithMouse(
        rotation,
        zoom,
        e.movementX,
        e.movementY,
      );
      Object.keys(ghostRef.current).forEach((id) => {
        ghostRef.current[id].add({
          x: arrow === "X" ? mouseVector.x : 0,
          y: arrow === "Y" ? mouseVector.y : 0,
          z: arrow === "Z" ? mouseVector.z : 0,
        });
      });
    },
    [arrow, rotation, zoom, handleMoveEnd],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Shift") setMultiSelect(true);
      if (e.key === "Delete") del(selected);
    },
    [setMultiSelect, del, selected],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Shift") setMultiSelect(false);
    },
    [setMultiSelect],
  );

  const handleModelClick = useCallback(
    (id: string) => {
      console.log("handleModelClick", id, multiSelect);
      select(id, multiSelect);
    },
    [multiSelect, select],
  );

  const center = useMemo(
    () =>
      new CallbackVector(
        getAxisCenter("x"),
        getAxisCenter("y"),
        getAxisCenter("z"),
      ),
    [getAxisCenter],
  );

  return (
    <div className={styles.container}>
      <div className={styles.viewport}>
        <Illustration
          element="canvas"
          zoom={zoom}
          pointerEvents
          translate={position}
          rotate={rotation}
          {...registerDolly()}
        >
          <Grid length={1000} cellSize={100} />
          <Model objects={objects} onClick={handleModelClick} />
        </Illustration>
      </div>
      {!!selected.length && (
        <div
          className={clsx(styles.viewport, {
            [styles.multiSelect]: multiSelect,
          })}
        >
          <Illustration
            element="canvas"
            zoom={zoom}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMoveEnd}
            translate={position}
            rotate={rotation}
            pointerEvents
            {...registerDolly()}
          >
            <TransformGizmo
              position={center}
              selectedArrow={arrow}
              onSelectArrow={handleMoveStart}
            />
          </Illustration>
          <DocEvent type="mousemove" listener={handleMove} />
          <DocEvent type="keydown" listener={handleKeyDown} />
          <DocEvent type="keyup" listener={handleKeyUp} />
        </div>
      )}
      {children}
    </div>
  );
};

export default Viewport;
