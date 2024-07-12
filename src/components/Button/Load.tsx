import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./Button.module.css";

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "type" | "title" | "size"
  > {
  variant?: "default";
  size?: "small" | "medium" | "large";
  alignment?: "left" | "center" | "right";
}

const Load = forwardRef<HTMLInputElement, Props>(
  (
    {
      children,
      variant = "default",
      size = "medium",
      alignment = "center",
      ...props
    },
    ref,
  ) => (
    <div
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        styles[alignment],
      )}
    >
      {children}
      <input
        className={styles.loader}
        type="file"
        ref={ref}
        title=""
        {...props}
      />
    </div>
  ),
);

export default Load;
