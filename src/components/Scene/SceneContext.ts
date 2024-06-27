import { createContext } from "react";
import InstanceType from "@/types/InstanceType";
import ObjectType from "@/types/ObjectType";
import ToolType from "@/types/ToolType";

interface SceneContextType {
  objects: InstanceType[];
  selected: InstanceType | null;
  tool: ToolType;
  paintColor: string;
  move: (instances: InstanceType[], parent?: InstanceType | null) => void;
  select: (instance: InstanceType | null) => void;
  update: (instance: InstanceType, props: Record<string, unknown>) => void;
  add: (obj: ObjectType, parent?: InstanceType | null) => void;
  del: (instances: InstanceType[]) => void;
  rename: (instance: InstanceType, name: string) => void;
  setTool: (tool: ToolType) => void;
  setPaintColor: (color: string) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export default SceneContext;
