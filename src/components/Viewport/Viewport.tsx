import { PropsWithChildren } from "react";
import { Illustration } from "react-zdog";
import useCamera from "@/components/Camera/useCamera";
import Dolly from "@/components/Dolly/Dolly";
import Entity from "@/components/Entity/Entity";
import TransformGizmo from "@/components/Gizmos/TransformGizmo/TransformGizmo";
import Grid from "@/components/Grid/Grid";
import useScene from "@/components/Scene/useScene";
import EntityType from "@/types/EntityType";
import styles from "./Viewport.module.css";

interface Props extends PropsWithChildren {
  entities: EntityType[];
}

const Viewport = ({ children, entities }: Props) => {
  const { zoom } = useCamera();
  const { selected, select } = useScene();

  return (
    <div className={styles.container}>
      <div className={styles.viewport}>
        <Illustration element="canvas" zoom={zoom} pointerEvents>
          <Dolly controllable canRotate canTranslate>
            <Grid length={1000} cellSize={100} />
            <Entity entities={entities} />
          </Dolly>
        </Illustration>
      </div>
      {!!selected && (
        <div className={styles.viewport}>
          <Illustration
            element="canvas"
            zoom={zoom}
            pointerEvents
            onClick={() => select(null)}
          >
            <Dolly controllable canRotate canTranslate>
              <TransformGizmo entity={selected} />
            </Dolly>
          </Illustration>
        </div>
      )}
      {children}
    </div>
  );
};

export default Viewport;
