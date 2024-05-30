import { createContext } from "react";
import InstanceType from "@/types/InstanceType";
import ObjectType from "@/types/ObjectType";

interface SceneContextType {
  objects: InstanceType[];
  selected: InstanceType | null;
  select: (instance: InstanceType | null) => void;
  update: (instance: InstanceType, props: Record<string, unknown>) => void;
  add: (obj: ObjectType, parent?: InstanceType | null) => void;
  del: (instance: InstanceType) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export default SceneContext;
