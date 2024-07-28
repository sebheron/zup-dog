import { useContext } from "react";
import UndoContext from "./UndoContext";

const useUndo = () => {
  const context = useContext(UndoContext);
  if (!context) {
    throw new Error("useUndo must be used within a UndoProvider");
  }
  return context;
};

export default useUndo;
