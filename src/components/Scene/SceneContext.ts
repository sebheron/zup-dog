import { Dispatch, SetStateAction, createContext } from "react";
import EntityType from "@/types/EntityType";
import MustDeclare from "@/types/MustDeclare";

interface SceneContextType {
  selected: EntityType | null;
  select: Dispatch<SetStateAction<EntityType | null>>;
  update: (id: string, props: MustDeclare<Record<string, unknown>>) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export default SceneContext;
