import { Dispatch, SetStateAction, createContext } from "react";
import EntityDeclaration from "@/types/EntityDeclaration";
import EntityType from "@/types/EntityType";
import MustDeclare from "@/types/MustDeclare";

interface SceneContextType {
  selected: EntityDeclaration | null;
  select: Dispatch<SetStateAction<EntityDeclaration | null>>;
  update: (id: string, props: MustDeclare<Record<string, unknown>>) => void;
  add: (entity: EntityType) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export default SceneContext;
