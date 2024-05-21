import { FC, PropsWithChildren } from "react";
import MustDeclare from "./MustDeclare";

type EntityType<
  C extends FC<PropsWithChildren> = FC<PropsWithChildren>,
  O extends object = object,
> = {
  id: string;
  name: string;
  component: C;
  props: MustDeclare<O>;
  children?: EntityType[];
};

export default EntityType;
