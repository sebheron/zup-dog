import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./Button.module.css";

interface Props
  extends Omit<
    React.HTMLAttributes<HTMLAnchorElement>,
    "className" | "target"
  > {
  href: string;
  variant?: "default";
  size?: "small" | "medium" | "large";
  alignment?: "left" | "center" | "right";
  active?: boolean;
}

const Link = forwardRef<HTMLAnchorElement, Props>(
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
    <a
      ref={ref}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        styles[alignment],
        { [styles.active]: active },
      )}
      {...props}
      target="_blank"
    >
      {children}
    </a>
  ),
);

export default Link;
