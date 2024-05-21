import { Dispatch, SetStateAction, createContext } from "react";
import VectorType from "../../types/VectorType";

interface CameraContextType {
  position: VectorType;
  rotation: VectorType;
  zoom: number;
  setPosition: Dispatch<SetStateAction<VectorType>>;
  setRotation: Dispatch<SetStateAction<VectorType>>;
  setZoom: Dispatch<SetStateAction<number>>;
  lerpTo: (
    targetPosition: VectorType,
    targetRotation: VectorType,
    time: number,
  ) => void;
}

const CameraContext = createContext<CameraContextType | null>(null);

export default CameraContext;
