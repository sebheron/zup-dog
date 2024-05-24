import { useCallback } from "react";
import useCamera from "@/components/Camera/useCamera";
import vector from "@/utils/vector";

const useDolly = () => {
  const { zoom, setPosition, setRotation, setZoom } = useCamera();

  const handleZoom = useCallback(
    (event: WheelEvent) => {
      if (event.buttons) return;
      setZoom((prevZoom) =>
        Math.max(0.1, Math.min(prevZoom - event.deltaY / 1000, 5)),
      );
    },
    [setZoom],
  );

  const handleTranslate = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setPosition((position) =>
        vector.shift(
          position,
          event.movementX * 0.8 * (1 / zoom),
          event.movementY * 0.8 * (1 / zoom),
        ),
      );
    },
    [zoom, setPosition],
  );

  const handleRotate = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setRotation((rotation) =>
        vector.spin(rotation, event.movementX / 600, event.movementY / 600),
      );
    },
    [setRotation],
  );

  const handleMove = useCallback(
    (event: MouseEvent) => {
      if (event.buttons === 2) handleTranslate(event);
      else if (event.buttons === 4) handleRotate(event);
    },
    [handleTranslate, handleRotate],
  );

  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();
  }, []);

  const registerDolly = () => ({
    onWheel: handleZoom,
    onMouseMove: handleMove,
    onContextMenu: handleContextMenu,
  });

  return { registerDolly };
};

export default useDolly;
