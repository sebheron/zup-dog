import clsx from "clsx";
import styles from "./Splitter.module.css";

interface Props {
  direction?: "horizontal" | "vertical";
}

const Splitter = ({ direction = "vertical" }: Props) => {
  return <div className={clsx(styles.splitter, styles[direction])} />;
};

export default Splitter;
