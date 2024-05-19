import { PropsWithChildren } from "react";
import styles from "./Bar.module.css";

const Bar = ({ children }: PropsWithChildren) => (
  <div className={styles.container}>
    <div className={styles.bar}>{children}</div>
  </div>
);

const Splitter = () => <div className={styles.splitter}></div>;

Bar.Splitter = Splitter;
export default Bar;
