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
import TranslationGizmo from "@/components/Gizmos/TranslationGizmo/TranslationGizmo";
import Grid from "@/components/Grid/Grid";
import Model from "@/components/Model/Model";
import useScene from "@/components/Scene/useScene";
import { TranslationType } from "@/constants/Translations";
import useDolly from "@/hooks/useDolly";
import CallbackVector from "@/types/CallbackVector";
import InstanceType from "@/types/InstanceType";
import VectorType from "@/types/VectorType";
import vector from "@/utils/vector";
import RotationGizmo from "../Gizmos/RotationGizmo/RotationGizmo";
import styles from "./Viewport.module.css";

interface Props extends PropsWithChildren {
  objects: InstanceType[];
}

const Viewport = ({ children, objects }: Props) => {
  const ghostRef = useRef<Record<string, Vector>>({});
  const { registerDolly } = useDolly();
  const { zoom, rotation, position } = useCamera();
  const { selected, select, update, del } = useScene();
  const [translation, setTranslation] = useState<TranslationType | null>(null);
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
    (newTranslation: TranslationType) => {
      if (!selected || newTranslation === translation) return;
      setTranslation(newTranslation);
      for (const selection of selected) {
        const obj = objects.find((o) => o.id === selection);
        if (!obj) continue;
        ghostRef.current[obj.id] = new Vector(obj.props.translate ?? {});
      }
      update(selected, (id) => ({
        translate: ghostRef.current[id],
      }));
    },
    [selected, translation, update, objects],
  );

  const handleMoveEnd = useCallback(() => {
    if (!selected || !translation) return;
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
    setTranslation(null);
  }, [selected, translation, update]);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (e.buttons !== 1 && translation) {
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
          x: translation === "XT" ? mouseVector.x : 0,
          y: translation === "YT" ? mouseVector.y : 0,
          z: translation === "ZT" ? mouseVector.z : 0,
        });
      });
    },
    [translation, rotation, zoom, handleMoveEnd],
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
            <TranslationGizmo
              position={center}
              selectedTranslation={translation}
              onBeginTranslation={handleMoveStart}
            />
            <RotationGizmo position={center} />
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
