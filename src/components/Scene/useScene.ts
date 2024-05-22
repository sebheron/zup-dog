import { useContext } from "react";
import SceneContext from "./SceneContext";

const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene must be used within a SceneProvider");
  }
  return context;
};

export default useScene;
