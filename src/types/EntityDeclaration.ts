import { FC } from "react";
import { AnchorOptions } from "zdog";
import Shapes from "@/constants/Shapes";
import EntityBase from "./EntityBase";
import MustDeclare from "./MustDeclare";

type EntityDeclaration<
  C extends FC<EntityBase> = FC<EntityBase>,
  O extends object = Record<string, unknown> & AnchorOptions,
> = {
  id: string;
  name: string;
  shape: keyof typeof Shapes;
  component: C;
  props: MustDeclare<O>;
  children?: EntityDeclaration[];
};

export default EntityDeclaration;
