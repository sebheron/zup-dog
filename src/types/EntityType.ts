import { FC, PropsWithChildren } from "react";
import { AnchorOptions } from "zdog";
import MustDeclare from "./MustDeclare";

interface BaseType extends PropsWithChildren {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}

type EntityType<
  C extends FC<BaseType> = FC<BaseType>,
  O extends object = Record<string, unknown> & AnchorOptions,
> = {
  id: string;
  name: string;
  component: C;
  props: MustDeclare<O>;
  children?: EntityType[];
};

export default EntityType;
