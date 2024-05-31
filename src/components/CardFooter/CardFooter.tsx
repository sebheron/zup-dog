import { PropsWithChildren } from "react";
import styles from "./CardFooter.module.css";

const CardFooter = ({ children }: PropsWithChildren) => (
  <footer className={styles.footer}>{children}</footer>
);

export default CardFooter;
