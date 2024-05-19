import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import Vector3 from "../../types/Vector3";

interface CameraContextType {
  position: Vector3;
  rotation: Vector3;
  zoom: number;
  updatePosition: (position: Vector3) => void;
  updateRotation: (rotation: Vector3) => void;
  updateZoom: (zoom: number) => void;
}

const CameraContext = createContext<CameraContextType | null>(null);

export const useCamera = (): CameraContextType => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
};

export const Camera = ({ children }: PropsWithChildren) => {
  const [position, setPosition] = useState<Vector3>({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState<Vector3>({ x: 0, y: 0, z: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const cameraContext = useMemo(
    () => ({
      position,
      rotation,
      zoom,
      updatePosition: setPosition,
      updateRotation: setRotation,
      updateZoom: setZoom,
    }),
    [position, rotation, zoom]
  );

  return (
    <CameraContext.Provider value={cameraContext}>
      {children}
    </CameraContext.Provider>
  );
};
