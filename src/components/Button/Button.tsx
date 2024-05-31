import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./Button.module.css";

interface Props
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: "default" | "selectable";
  size?: "small" | "medium" | "large";
  alignment?: "left" | "center" | "right";
  active?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      variant = "default",
      size = "medium",
      alignment = "center",
      active = false,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        styles[alignment],
        { [styles.active]: active },
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

export default Button;
