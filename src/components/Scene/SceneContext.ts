import { Dispatch, SetStateAction, createContext } from "react";
import ObjectInstance from "@/types/ObjectInstance";
import ObjectType from "@/types/ObjectType";
import MustDeclare from "@/types/utility/MustDeclare";

interface SceneContextType {
  selected: ObjectInstance | null;
  select: Dispatch<SetStateAction<ObjectInstance | null>>;
  update: (id: string, props: MustDeclare<Record<string, unknown>>) => void;
  add: (obj: ObjectType) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export default SceneContext;
