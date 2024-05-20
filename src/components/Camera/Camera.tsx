import { PropsWithChildren, useMemo, useState } from "react";
import { Vector } from "zdog";

import VectorType from "../../types/VectorType";
import CameraContext from "./CameraContext";

const Camera = ({ children }: PropsWithChildren) => {
  const [animating, setAnimating] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<VectorType>({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState<VectorType>({
    x: -0.3,
    y: 0.55,
    z: 0,
  });

  //When animating the camera we'll switch to using the vector class
  //Then by using the lerp method in the class, we can interpolate without rerendering
  const lerpRotation = async (target: VectorType, time: number) => {
    let startTime: number;
    const newRotation = new Vector(rotation);

    setAnimating(true);
    setRotation(newRotation);

    const step = (t: number) => {
      if (!startTime) startTime = t;
      const elapsed = t - startTime;
      const vector = newRotation.lerp(target, elapsed / time);
      newRotation.set(vector);

      if (elapsed > time) {
        setRotation(target);
        setAnimating(false);
        return;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  //Same for position
  const lerpPosition = async (target: VectorType, time: number) => {
    let startTime: number;
    const newPosition = new Vector(position);

    setAnimating(true);
    setPosition(newPosition);

    const step = (t: number) => {
      if (!startTime) startTime = t;
      const elapsed = t - startTime;
      const vector = newPosition.lerp(target, elapsed / time);
      newPosition.set(vector);

      if (elapsed > time) {
        setPosition(target);
        setAnimating(false);
        return;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const cameraContext = useMemo(
    () => ({
      animating,
      position,
      rotation,
      zoom,
      setZoom,
      setPosition,
      setRotation,
      lerpRotation,
      lerpPosition,
    }),
    [animating, position, rotation, zoom]
  );

  return (
    <CameraContext.Provider value={cameraContext}>
      {children}
    </CameraContext.Provider>
  );
};

export default Camera;
