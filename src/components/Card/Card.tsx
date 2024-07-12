import clsx from "clsx";
import { PropsWithChildren } from "react";
import styles from "./Card.module.css";

interface Props
  extends PropsWithChildren,
    Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  position: "left" | "right";
}

const Card = ({ children, position, ...props }: Props) => (
  <div className={clsx(styles.card, styles[position])} {...props}>
    <div className={styles.container}>{children}</div>
  </div>
);

const CardFooter = ({ children }: PropsWithChildren) => (
  <footer className={styles.footer}>{children}</footer>
);

Card.Footer = CardFooter;
export default Card;
