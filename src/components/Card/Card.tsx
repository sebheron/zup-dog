import { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./Card.module.css";

interface Props extends PropsWithChildren {
  position: "left" | "right";
}

const Card = ({ children, position }: Props) => (
  <div className={clsx(styles.card, styles[position])}>{children}</div>
);

export default Card;
