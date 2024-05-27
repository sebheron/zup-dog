import clsx from "clsx";
import {
  CSSProperties,
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
import { ActionType } from "@/constants/Actions";
import useDolly from "@/hooks/useDolly";
import CallbackVector from "@/types/CallbackVector";
import InstanceType from "@/types/InstanceType";
import Vector3Type from "@/types/Vector3Type";
import vector from "@/utils/vector";
import RotationGizmo from "../Gizmos/RotationGizmo/RotationGizmo";
import styles from "./Viewport.module.css";

interface Props extends PropsWithChildren {
  objects: InstanceType[];
}

const Viewport = ({ children, objects }: Props) => {
  const { registerDolly } = useDolly();
  const { zoom, rotation, position } = useCamera();
  const { selected, select, update, del } = useScene();
  const [action, setAction] = useState<ActionType | null>(null);
  const [multiSelect, setMultiSelect] = useState(false);
  const [screenPos, setScreenPos] = useState<CSSProperties>({
    top: 0,
    left: 0,
  });
  const ghostRef = useRef<Record<string, Vector>>({});

  const getAxisCenter = useCallback(
    (axis: keyof Vector3Type) => {
      return () =>
        selected.reduce((acc, id) => {
          const obj = objects.find((o) => o.id === id);
          if (!obj) return acc;
          return acc + (obj.props.translate?.[axis] ?? 0);
        }, 0) / selected.length;
    },
    [selected, objects],
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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (e.buttons !== 1) return;
      select(null);
    },
    [select],
  );

  const handleActionStart = useCallback(
    (newAction: ActionType) => {
      if (!selected || newAction === action) return;
      setAction(newAction);
      for (const selection of selected) {
        const obj = objects.find((o) => o.id === selection);
        if (!obj) continue;
        ghostRef.current[obj.id] = new Vector(obj.props.translate ?? {});
      }
      update(selected, (id) => ({
        translate: ghostRef.current[id],
      }));
    },
    [selected, action, update, objects],
  );

  const handleActionEnd = useCallback(() => {
    if (!selected || !action) return;
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
    setAction(null);
  }, [selected, action, update]);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (e.buttons !== 1 && action) {
        handleActionEnd();
        return;
      }

      const a = vector.worldToScreen(rotation, position, zoom, center);

      setScreenPos({
        top: a.y,
        left: a.x,
      });

      const mouseVector = vector.mouseToWorld(
        rotation,
        zoom,
        e.movementX,
        e.movementY,
      );
      Object.keys(ghostRef.current).forEach((id) => {
        ghostRef.current[id].x += action === "XT" ? mouseVector.x : 0;
        ghostRef.current[id].y += action === "YT" ? mouseVector.y : 0;
        ghostRef.current[id].z += action === "ZT" ? mouseVector.z : 0;
      });
    },
    [action, rotation, position, zoom, center, handleActionEnd],
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
      select(id, multiSelect);
    },
    [multiSelect, select],
  );

  return (
    <div className={styles.container}>
      <div className={styles.viewport}>
        <Illustration
          element="canvas"
          zoom={zoom}
          pointerEvents
          rotate={rotation}
          translate={position}
          {...registerDolly()}
        >
          <Grid length={1000} cellSize={100} />
          <Model objects={objects} onClick={handleModelClick} />
        </Illustration>
      </div>
      {!!selected.length && (
        <div
          className={clsx(styles.viewport, styles.filtered, {
            [styles.multiSelect]: multiSelect,
          })}
        >
          <Illustration
            element="canvas"
            zoom={zoom}
            onPointerDown={handleMouseDown}
            onPointerUp={handleActionEnd}
            rotate={rotation}
            translate={position}
            pointerEvents
            {...registerDolly()}
          >
            <TranslationGizmo
              position={center}
              action={action}
              onAction={handleActionStart}
            />
            <RotationGizmo
              position={center}
              action={action}
              onAction={handleActionStart}
            />
          </Illustration>
          <DocEvent type="mousemove" listener={handleMove} />
          <DocEvent type="keydown" listener={handleKeyDown} />
          <DocEvent type="keyup" listener={handleKeyUp} />
          <div
            style={{
              ...screenPos,
              position: "absolute",
              pointerEvents: "none",
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default Viewport;
