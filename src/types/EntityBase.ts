import { PropsWithChildren } from "react";

type EntityBase = PropsWithChildren<{
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}>;

export default EntityBase;
