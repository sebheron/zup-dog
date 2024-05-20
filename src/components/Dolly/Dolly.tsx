import { PropsWithChildren, useCallback, useEffect } from "react";
import { useRender, Shape } from "react-zdog";

import useCamera from "../Camera/useCamera";
import useIllustration from "../../hooks/useIllustration";
import { shift, spin } from "../../utils/vector";

interface Props extends PropsWithChildren {
  controllable?: boolean;
  canRotate?: boolean;
  canTranslate?: boolean;
  canZoom?: boolean;
}

const Dolly = ({
  controllable,
  canRotate,
  canTranslate,
  canZoom,
  children,
}: Props) => {
  const {
    animating,
    position,
    rotation,
    zoom,
    setPosition,
    setRotation,
    setZoom,
  } = useCamera();
  const illo = useIllustration();

  const handleZoom = useCallback(
    (event: WheelEvent) => {
      if (event.buttons) return;
      setZoom((prevZoom) =>
        Math.max(0.1, Math.min(prevZoom - event.deltaY / 1000, 5))
      );
    },
    [setZoom]
  );

  //TODO: Translate is broken, shift method gives back odd values when at the top of the view
  const handleTranslate = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setPosition((position) =>
        shift(
          position,
          rotation,
          event.movementX * 0.8 * (1 / zoom),
          event.movementY * 0.8 * (1 / zoom)
        )
      );
    },
    [rotation, zoom, setPosition]
  );

  const handleRotate = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setRotation((rotation) =>
        spin(rotation, event.movementX / 600, event.movementY / 600)
      );
    },
    [setRotation]
  );

  const handleMove = useCallback(
    (event: MouseEvent) => {
      if (event.buttons === 2) handleTranslate(event);
      else if (event.buttons === 4) handleRotate(event);
    },
    [handleTranslate]
  );

  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    if (!controllable || animating) return;
    const canvas = illo.element as HTMLCanvasElement;
    canvas.addEventListener("wheel", handleZoom);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("contextmenu", handleContextMenu);
    return () => {
      canvas.removeEventListener("wheel", handleZoom);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [
    illo,
    controllable,
    animating,
    handleMove,
    handleZoom,
    handleContextMenu,
  ]);

  useRender(() => {
    if (canZoom) illo.zoom = zoom;
  }, [zoom, canZoom]);

  return (
    <Shape rotate={canRotate ? rotation : undefined}>
      <Shape translate={canTranslate ? position : undefined}>{children}</Shape>
    </Shape>
  );
};

export default Dolly;
