import { Dispatch, SetStateAction, createContext } from "react";

import VectorType from "../../types/VectorType";

interface CameraContextType {
  animating: boolean;
  position: VectorType;
  rotation: VectorType;
  zoom: number;
  setPosition: Dispatch<SetStateAction<VectorType>>;
  setRotation: Dispatch<SetStateAction<VectorType>>;
  setZoom: Dispatch<SetStateAction<number>>;
  lerpRotation: (target: VectorType, time: number) => void;
  lerpPosition: (target: VectorType, time: number) => void;
}

const CameraContext = createContext<CameraContextType | null>(null);

export default CameraContext;
