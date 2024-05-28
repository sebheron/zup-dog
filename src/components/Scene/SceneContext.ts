import { createContext } from "react";
import ObjectType from "@/types/ObjectType";
import MustDeclare from "@/types/utility/MustDeclare";

interface SceneContextType {
  selected: string | null;
  select: (id: string | null) => void;
  update: (
    ids: string[],
    props: (id: string) => MustDeclare<Record<string, unknown>> | undefined,
  ) => void;
  add: (obj: ObjectType) => void;
  del: (ids: string[]) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export default SceneContext;
