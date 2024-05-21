import clsx from "clsx";
import styles from "./Logo.module.css";

interface Props {
  size?: "small" | "large";
}

const Logo = ({ size = "small" }: Props) => (
  <h1 className={clsx(styles.logo, styles[size])}>zup-dog</h1>
);

export default Logo;
