import clsx from "clsx";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
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
import InstanceType from "@/types/InstanceType";
import Vector3Type from "@/types/Vector3Type";
import vector from "@/utils/vector";
import RotationGizmo from "../Gizmos/RotationGizmo/RotationGizmo";
import SelectedModel from "../SelectedModel/SelectedModel";
import styles from "./Viewport.module.css";

const Viewport = ({ children }: PropsWithChildren) => {
  const { registerDolly } = useDolly();
  const { zoom, rotation, position } = useCamera();
  const { objects, selected, select, update, del, getGlobalTransform } =
    useScene();
  const [action, setAction] = useState<ActionType | null>(null);

  const transformRef = useRef<Vector>(new Vector());
  const rotationRef = useRef<Vector>(new Vector());

  const getWorldScreenPos = useCallback(
    (pos: Vector3Type) => {
      return vector.worldToScreen(rotation, position, zoom, pos);
    },
    [rotation, zoom, position],
  );

  const getMouseWorldPos = useCallback(
    (x: number, y: number) => {
      return vector.mouseToWorld(rotation, zoom, x, y);
    },
    [rotation, zoom],
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
      transformRef.current.set(selected?.props.translate ?? {});
      rotationRef.current.set(selected?.props.rotate ?? {});
      update(selected, {
        translate: transformRef.current,
        rotate: rotationRef.current,
      });
    },
    [selected, action, update],
  );

  const handleActionEnd = useCallback(() => {
    if (!selected || !action) return;
    update(selected, {
      translate: {
        x: transformRef.current.x,
        y: transformRef.current.y,
        z: transformRef.current.z,
      },
      rotate: {
        x: rotationRef.current.x,
        y: rotationRef.current.y,
        z: rotationRef.current.z,
      },
    });
    select(selected);
    setAction(null);
  }, [selected, action, update, select]);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (e.buttons !== 1 && action) {
        handleActionEnd();
        return;
      }

      const center2d = getWorldScreenPos(transformRef.current);
      const centerVector = getMouseWorldPos(center2d.x, center2d.y);
      const movementVector = getMouseWorldPos(e.movementX, e.movementY);
      const mouseVector = getMouseWorldPos(e.clientX, e.clientY);
      const prevMouseVector = getMouseWorldPos(
        e.clientX - e.movementX,
        e.clientY - e.movementY,
      );
      const delta = vector.angleDelta(
        centerVector,
        mouseVector,
        prevMouseVector,
      );

      // Translation
      const translation = {
        x: action === "XT" ? movementVector.x : 0,
        y: action === "YT" ? movementVector.y : 0,
        z: action === "ZT" ? movementVector.z : 0,
      };

      // Rotation
      const rotate = vector.globalRotate(rotationRef.current, {
        x: action === "XR" ? delta.z : 0,
        y: action === "YR" ? delta.y : 0,
        z: action === "ZR" ? delta.x : 0,
      });

      rotationRef.current.set(rotate);
      transformRef.current.add(translation);
    },
    [action, handleActionEnd, getMouseWorldPos, getWorldScreenPos],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Delete" && selected) del([selected.id]);
    },
    [del, selected],
  );

  const handleModelClick = useCallback(
    (instance: InstanceType) => {
      select(instance);
    },
    [select],
  );

  useEffect(() => {
    if (!selected) return;
    transformRef.current.set(selected?.props.translate ?? {});
    rotationRef.current.set(selected?.props.rotate ?? {});
  }, [selected, objects]);

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
      {!!selected && (
        <div className={clsx(styles.viewport, styles.filtered)}>
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
            <SelectedModel objects={objects}>
              <TranslationGizmo action={action} onAction={handleActionStart} />
              <RotationGizmo action={action} onAction={handleActionStart} />
            </SelectedModel>
          </Illustration>
          <DocEvent type="mousemove" listener={handleMove} />
          <DocEvent type="keydown" listener={handleKeyDown} />
        </div>
      )}
      {children}
    </div>
  );
};

export default Viewport;
