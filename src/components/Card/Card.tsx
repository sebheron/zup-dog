import clsx from "clsx";
import { PropsWithChildren } from "react";
import styles from "./Card.module.css";

interface Props extends PropsWithChildren {
  position: "left" | "right";
}

const Card = ({ children, position }: Props) => (
  <div className={clsx(styles.card, styles[position])}>
    <div className={styles.container}>{children}</div>
  </div>
);

const CardFooter = ({ children }: PropsWithChildren) => (
  <footer className={styles.footer}>{children}</footer>
);

Card.Footer = CardFooter;
export default Card;
