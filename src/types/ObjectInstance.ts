import { FC } from "react";
import { AdditionalElementProps } from "react-zdog-alt";
import { AnchorOptions } from "zdog";
import Shapes from "@/constants/Shapes";
import MustDeclare from "./utility/MustDeclare";

type ObjectInstance<
  C extends FC<AdditionalElementProps> = FC<AdditionalElementProps>,
  O extends object = Record<string, unknown> & AnchorOptions,
> = {
  id: string;
  name: string;
  shape: keyof typeof Shapes;
  component: C;
  props: MustDeclare<O>;
  children?: ObjectInstance[];
};

export default ObjectInstance;
