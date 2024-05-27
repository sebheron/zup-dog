import { Dispatch, SetStateAction, createContext } from "react";
import Vector3Type from "../../types/Vector3Type";

interface CameraContextType {
  position: Vector3Type;
  rotation: Vector3Type;
  zoom: number;
  setPosition: Dispatch<SetStateAction<Vector3Type>>;
  setRotation: Dispatch<SetStateAction<Vector3Type>>;
  setZoom: Dispatch<SetStateAction<number>>;
  lerpTo: (
    targetPosition: Vector3Type,
    targetRotation: Vector3Type,
    time: number,
  ) => void;
  reset: () => void;
}

const CameraContext = createContext<CameraContextType | null>(null);

export default CameraContext;
