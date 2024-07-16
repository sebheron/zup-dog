import { useCallback } from "react";
import { Vector } from "zdog";
import useCamera from "@/components/Camera/useCamera";
import Vector3Type from "@/types/Vector3Type";
import vector from "@/utils/vector";

const useDolly = () => {
  const { zoom, position, rotation, setPosition, setRotation, setZoom } =
    useCamera();

  const handleZoom = useCallback(
    (event: WheelEvent) => {
      if (event.buttons) return;
      setZoom((prevZoom) =>
        Math.max(0.1, Math.min(prevZoom - event.deltaY / 1000, 5)),
      );
    },
    [setZoom],
  );

  const beginTranslate = useCallback(
    (originalPosition: Vector3Type) => {
      const translateVector = new Vector(originalPosition);
      setPosition(translateVector);

      const mouseMove = (event: MouseEvent) => {
        event.preventDefault();
        translateVector.set(
          vector.shift(
            translateVector,
            event.movementX * 0.8 * (1 / zoom),
            event.movementY * 0.8 * (1 / zoom),
          ),
        );
      };

      const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
      };

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    },
    [zoom, setPosition],
  );

  const beginRotate = useCallback(
    (originalRotation: Vector3Type) => {
      const rotateVector = new Vector(originalRotation);
      setRotation(rotateVector);

      const mouseMove = (event: MouseEvent) => {
        event.preventDefault();
        rotateVector.set(
          vector.spin(
            rotateVector,
            event.movementX / 600,
            event.movementY / 600,
          ),
        );
      };

      const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
      };

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    },
    [setRotation],
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.button === 2) beginTranslate(position);
      else if (event.button === 1) beginRotate(rotation);
    },
    [beginTranslate, beginRotate, position, rotation],
  );

  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();
  }, []);

  const registerDolly = () => ({
    onWheel: handleZoom,
    onMouseDown: handleMouseDown,
    onContextMenu: handleContextMenu,
  });

  return { registerDolly };
};

export default useDolly;
