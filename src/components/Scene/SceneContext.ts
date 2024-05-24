import { createContext } from "react";
import ObjectType from "@/types/ObjectType";
import MustDeclare from "@/types/utility/MustDeclare";

interface SceneContextType {
  selected: string[];
  select: (id: string | null, add?: boolean) => void;
  update: (
    ids: string[],
    props: (id: string) => MustDeclare<Record<string, unknown>> | undefined,
  ) => void;
  add: (obj: ObjectType) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export default SceneContext;
