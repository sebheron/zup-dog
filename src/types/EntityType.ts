import { FC } from "react";
import { AnchorOptions } from "zdog";
import EntityBase from "./EntityBase";
import EntityDeclaration from "./EntityDeclaration";

type EntityType<
  C extends FC<EntityBase> = FC<EntityBase>,
  O extends object = Record<string, unknown> & AnchorOptions,
> = Omit<EntityDeclaration<C, O>, "id" | "name">;

export default EntityType;
