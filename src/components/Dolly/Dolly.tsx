import { useCallback, useEffect } from "react";
import { useRender } from "react-zdog";
import useIllo from "../../hooks/useIllo";
import useCamera from "../Camera/useCamera";

interface Props {
  controllable?: boolean;
  rotate?: boolean;
  translate?: boolean;
  zoom?: boolean;
}

const Dolly = ({ controllable, rotate, translate, zoom }: Props) => {
  const { updatePosition, updateRotation, updateZoom, ...camera } = useCamera();
  const illo = useIllo();

  const handleZoom = useCallback(
    (event: WheelEvent) => {
      if (event.buttons) return;
      updateZoom((prevZoom) =>
        Math.max(0.1, Math.min(prevZoom - event.deltaY / 1000, 5))
      );
    },
    [camera.zoom, updateZoom]
  );

  const handleTranslate = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const right = {
        x: Math.cos(camera.rotation.y),
        y: 0,
        z: -Math.sin(camera.rotation.y),
      };
      const up = {
        x: Math.sin(camera.rotation.x) * Math.sin(camera.rotation.y),
        y: Math.cos(camera.rotation.x),
        z: Math.sin(camera.rotation.x) * Math.cos(camera.rotation.y),
      };
      const moveX = event.movementX / 2;
      const moveY = event.movementY / 2;
      const move = {
        x: right.x * moveX + up.x * moveY,
        y: right.y * moveX + up.y * moveY,
        z: right.z * moveX + up.z * moveY,
      };
      updatePosition((prevPosition) => ({
        x: prevPosition.x + (move.x * 1) / camera.zoom,
        y: prevPosition.y + (move.y * 1) / camera.zoom,
        z: prevPosition.z + (move.z * 1) / camera.zoom,
      }));
    },
    [updatePosition, camera.zoom]
  );

  const handleRotate = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const moveRX = (event.movementY / 600) * Math.PI * -1;
      const moveRY = (event.movementX / 600) * Math.PI * -1;
      updateRotation((prevRotation) => ({
        x: prevRotation.x + moveRX,
        y: prevRotation.y + moveRY,
        z: prevRotation.z,
      }));
    },
    [updateRotation]
  );

  const handleMove = useCallback(
    (event: MouseEvent) => {
      if (event.buttons === 1) handleTranslate(event);
      if (event.buttons === 4) handleRotate(event);
    },
    [updatePosition, updateRotation, handleTranslate]
  );

  useEffect(() => {
    if (!controllable) return;
    const canvas = illo.element as HTMLCanvasElement;
    canvas.addEventListener("wheel", handleZoom);
    canvas.addEventListener("mousemove", handleMove);

    return () => {
      canvas.removeEventListener("wheel", handleZoom);
      canvas.removeEventListener("mousemove", handleMove);
    };
  }, [controllable, updatePosition, updateRotation, updateZoom]);

  useRender(() => {
    if (rotate) {
      illo.rotate.x = camera.rotation.x;
      illo.rotate.y = camera.rotation.y;
      illo.rotate.z = camera.rotation.z;
    }

    if (translate) {
      illo.translate.x = camera.position.x;
      illo.translate.y = camera.position.y;
      illo.translate.z = camera.position.z;
    }

    if (zoom) illo.zoom = camera.zoom;
  }, [camera, rotate, translate, zoom]);
  return <></>;
};

export default Dolly;
