import { createContext } from "react";
import InstanceType from "@/types/InstanceType";
import ObjectType from "@/types/ObjectType";
import MustDeclare from "@/types/utility/MustDeclare";

interface SceneContextType {
  selected: InstanceType | null;
  select: (instance: InstanceType | null) => void;
  update: (
    instance: InstanceType,
    props: MustDeclare<Record<string, unknown>>,
  ) => void;
  add: (obj: ObjectType, parent?: InstanceType | null) => void;
  del: (ids: string[]) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export default SceneContext;
