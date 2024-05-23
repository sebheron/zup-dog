import { PropsWithChildren, useCallback } from "react";
import { Illustration } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import Dolly from "@/components/Dolly/Dolly";
import Grid from "@/components/Grid/Grid";
import Model from "@/components/Model/Model";
import useScene from "@/components/Scene/useScene";
import TransformGizmo from "@/components/TransformGizmo/TransformGizmo";
import ObjectInstance from "@/types/ObjectInstance";
import styles from "./Viewport.module.css";

interface Props extends PropsWithChildren {
  objects: ObjectInstance[];
}

const Viewport = ({ children, objects }: Props) => {
  const { zoom } = useCamera();
  const { selected, select } = useScene();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (e.buttons !== 1) return;
      select(null);
    },
    [select],
  );

  return (
    <div className={styles.container}>
      <div className={styles.viewport}>
        <Illustration element="canvas" zoom={zoom} pointerEvents>
          <Dolly controllable canRotate canTranslate>
            <Grid length={1000} cellSize={100} />
            <Model objects={objects} />
          </Dolly>
        </Illustration>
      </div>
      {!!selected && (
        <div className={styles.viewport}>
          <Illustration
            element="canvas"
            zoom={zoom}
            onPointerDown={handleMouseDown}
            pointerEvents
          >
            <Dolly controllable canRotate canTranslate>
              <TransformGizmo obj={selected} />
            </Dolly>
          </Illustration>
        </div>
      )}
      {children}
    </div>
  );
};

export default Viewport;
