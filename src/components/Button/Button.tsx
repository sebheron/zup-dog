import clsx from "clsx";
import styles from "./Button.module.css";

interface Props
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: "default" | "important" | "primary" | "secondary";
}

const Button = ({ children, variant = "default", ...props }: Props) => (
  <button className={clsx(styles.button, styles[variant])} {...props}>
    {children}
  </button>
);

export default Button;
