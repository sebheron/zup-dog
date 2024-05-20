import { PropsWithChildren } from "react";
import { Illustration } from "react-zdog";

import styles from "./Viewport.module.css";
import Grid from "../Grid/Grid";
import Dolly from "../Dolly/Dolly";

const Viewport = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.viewport}>
      <Illustration pointerEvents element="canvas">
        <Dolly controllable canRotate canTranslate canZoom>
          {children}
          <Grid length={800} cellSize={100} />
        </Dolly>
      </Illustration>
    </div>
  );
};

export default Viewport;
