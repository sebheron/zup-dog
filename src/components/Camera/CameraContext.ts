import { createContext } from "react";
import Vector3 from "../../types/Vector3";

interface CameraContextType {
  position: Vector3;
  rotation: Vector3;
  zoom: number;
  updatePosition: React.Dispatch<React.SetStateAction<Vector3>>;
  updateRotation: React.Dispatch<React.SetStateAction<Vector3>>;
  updateZoom: React.Dispatch<React.SetStateAction<number>>;
}

const CameraContext = createContext<CameraContextType | null>(null);

export default CameraContext;
