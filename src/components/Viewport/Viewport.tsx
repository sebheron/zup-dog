import clsx from "clsx";
import { PropsWithChildren, useCallback } from "react";
import { Illustration } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import DocEvent from "@/components/DocEvent/DocEvent";
import Grid from "@/components/Grid/Grid";
import Model from "@/components/Model/Model";
import useScene from "@/components/Scene/useScene";
import SelectedModel from "@/components/SelectedModel/SelectedModel";
import useDolly from "@/hooks/useDolly";
import InstanceType from "@/types/InstanceType";
import styles from "./Viewport.module.css";

const Viewport = ({ children }: PropsWithChildren) => {
  const { registerDolly } = useDolly();
  const { zoom, rotation, position } = useCamera();
  const { objects, selected, select, del } = useScene();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (e.buttons !== 1) return;
      select(null);
    },
    [select],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Delete" && selected) del(selected);
    },
    [del, selected],
  );

  const handleModelClick = useCallback(
    (instance: InstanceType) => {
      select(instance);
    },
    [select],
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
      {!!selected && (
        <div className={clsx(styles.viewport, styles.filtered)}>
          <Illustration
            element="canvas"
            zoom={zoom}
            onPointerDown={handleMouseDown}
            rotate={rotation}
            translate={position}
            pointerEvents
            {...registerDolly()}
          >
            <SelectedModel objects={objects} />
          </Illustration>
          <DocEvent type="keydown" listener={handleKeyDown} />
        </div>
      )}
      {children}
    </div>
  );
};

export default Viewport;
