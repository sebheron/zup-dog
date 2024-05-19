import { PropsWithChildren, useMemo, useState } from "react";

import Vector3 from "../../types/Vector3";
import CameraContext from "./CameraContext";

const Camera = ({ children }: PropsWithChildren) => {
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

export default Camera;
