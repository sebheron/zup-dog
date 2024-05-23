import { PropsWithChildren, useCallback, useEffect } from "react";
import { Shape, useZdog } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import vector from "@/utils/vector";

interface Props extends PropsWithChildren {
  controllable?: boolean;
  canRotate?: boolean;
  canTranslate?: boolean;
}

const Dolly = ({ controllable, canRotate, canTranslate, children }: Props) => {
  const { position, rotation, zoom, setPosition, setRotation, setZoom } =
    useCamera();
  const { illu } = useZdog();

  const handleZoom = useCallback(
    (event: WheelEvent) => {
      if (event.buttons) return;
      setZoom((prevZoom) =>
        Math.max(0.1, Math.min(prevZoom - event.deltaY / 1000, 5)),
      );
    },
    [setZoom],
  );

  //TODO: Translate is broken, shift method gives back odd values when at the top of the view
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
    [rotation, zoom, setPosition],
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

  useEffect(() => {
    if (!controllable) return;
    const canvas = illu.element as HTMLCanvasElement;
    canvas.addEventListener("wheel", handleZoom);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("contextmenu", handleContextMenu);
    return () => {
      canvas.removeEventListener("wheel", handleZoom);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [illu, controllable, handleMove, handleZoom, handleContextMenu]);

  return (
    <Shape translate={canTranslate ? position : undefined}>
      <Shape rotate={canRotate ? rotation : undefined}>{children}</Shape>
    </Shape>
  );
};

export default Dolly;
