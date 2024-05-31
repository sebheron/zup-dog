import { createContext } from "react";
import InstanceType from "@/types/InstanceType";
import ObjectType from "@/types/ObjectType";

interface SceneContextType {
  objects: InstanceType[];
  selected: InstanceType | null;
  move: (instances: InstanceType[], parent?: InstanceType | null) => void;
  select: (instance: InstanceType | null) => void;
  update: (instance: InstanceType, props: Record<string, unknown>) => void;
  add: <T extends Record<string, any>>(
    obj: ObjectType<T>,
    parent?: InstanceType | null,
  ) => void;
  del: (instances: InstanceType[]) => void;
  rename: (instance: InstanceType, name: string) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export default SceneContext;
