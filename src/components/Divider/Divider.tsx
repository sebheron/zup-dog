import clsx from "clsx";
import styles from "./Divider.module.css";

interface Props {
  direction?: "horizontal" | "vertical";
}

const Divider = ({ direction = "vertical" }: Props) => {
  return <div className={clsx(styles.divider, styles[direction])} />;
};

export default Divider;
