import { nanoid } from "nanoid";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { Vector } from "zdog";
import Global from "@/constants/Global";
import VectorType from "@/types/VectorType";
import CameraContext from "./CameraContext";

const Camera = ({ children }: PropsWithChildren) => {
  const animating = useRef<string | null>(null);
  const [zoom, setZoom] = useState<number>(Global.DefaultZoom);
  const [position, setPosition] = useState<VectorType>(Global.DefaultPosition);
  const [rotation, setRotation] = useState<VectorType>(Global.DefaultRotation);

  //Cheat lerping by switching to Vector class
  const lerpTo = async (
    targetPosition: VectorType,
    targetRotation: VectorType,
    time: number,
  ) => {
    let startTime: number;
    const newPosition = new Vector(position);
    const newRotation = new Vector(rotation);

    const animationId = nanoid();
    animating.current = animationId;
    setPosition(newPosition);
    setRotation(newRotation);

    const step = (t: number) => {
      if (animating.current !== animationId) return;
      if (!startTime) startTime = t;
      const elapsed = t - startTime;

      const positionVector = newPosition.lerp(targetPosition, elapsed / time);
      const rotationVector = newRotation.lerp(targetRotation, elapsed / time);
      newPosition.set(positionVector);
      newRotation.set(rotationVector);

      if (elapsed > time) {
        setPosition(targetPosition);
        setRotation(targetRotation);
        animating.current = null;
        return;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  //Curried function to set state and reset animation
  const set =
    <T,>(setter: Dispatch<SetStateAction<T>>) =>
    (value: SetStateAction<T>) => {
      animating.current = null;
      setter(value);
    };

  const reset = () => {
    lerpTo(Global.DefaultPosition, Global.DefaultRotation, 1000);
    setZoom(Global.DefaultZoom);
  };

  const cameraContext = useMemo(
    () => ({
      position,
      rotation,
      zoom,
      setZoom: set(setZoom),
      setPosition: set(setPosition),
      setRotation: set(setRotation),
      lerpTo,
      reset,
    }),
    [animating, position, rotation, zoom],
  );

  return (
    <CameraContext.Provider value={cameraContext}>
      {children}
    </CameraContext.Provider>
  );
};

export default Camera;
