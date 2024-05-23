import { FC } from "react";
import { AdditionalElementProps } from "react-zdog-alt";
import { AnchorOptions } from "zdog";
import ObjectInstance from "./ObjectInstance";

type ObjectType<
  C extends FC<AdditionalElementProps> = FC<AdditionalElementProps>,
  O extends object = Record<string, unknown> & AnchorOptions,
> = Omit<ObjectInstance<C, O>, "id" | "name">;

export default ObjectType;
