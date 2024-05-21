import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./Button.module.css";

interface Props
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: "default" | "important" | "primary" | "secondary";
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = "default", ...props }, ref) => (
    <button
      className={clsx(styles.button, styles[variant])}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  ),
);

export default Button;
