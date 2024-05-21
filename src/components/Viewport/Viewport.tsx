import { PropsWithChildren } from "react";
import { Illustration } from "react-zdog";
import Dolly from "@/components/Dolly/Dolly";
import Entity from "@/components/Entity/Entity";
import Grid from "@/components/Grid/Grid";
import EntityType from "@/types/EntityType";
import styles from "./Viewport.module.css";

interface Props extends PropsWithChildren {
  entities: EntityType[];
}

const Viewport = ({ children, entities }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.viewport}>
        <Illustration pointerEvents element="canvas">
          <Dolly controllable canRotate canTranslate canZoom>
            <Grid length={800} cellSize={100} />
            <Entity entities={entities} />
          </Dolly>
        </Illustration>
        {children}
      </div>
    </div>
  );
};

export default Viewport;
