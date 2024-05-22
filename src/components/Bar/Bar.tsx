import { PropsWithChildren } from "react";
import styles from "./Bar.module.css";

const Bar = ({ children }: PropsWithChildren) => (
  <div className={styles.container}>
    <div className={styles.bar}>{children}</div>
  </div>
);

export default Bar;
