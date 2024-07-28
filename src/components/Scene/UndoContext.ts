import { createContext } from "react";

interface UndoContextType {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const UndoContext = createContext<UndoContextType | null>(null);

export default UndoContext;