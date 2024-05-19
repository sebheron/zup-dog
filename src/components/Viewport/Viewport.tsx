import { useCallback, useEffect, useRef } from "react";
import { Illustration, Shape } from "zdog";

import { useCamera } from "../Camera/Camera";

const GRID_SIZE = 400;
const GRID_CELL_SIZE = 20;

const Viewport = () => {
  const { updateRotation, ...camera } = useCamera();

  const canvas = useRef<HTMLCanvasElement>(null);
  const viewport = useRef<Illustration | null>(null);

  const drawGrid = useCallback((illo: Illustration) => {
    const grid = new Shape({
      addTo: illo,
      stroke: 1,
      color: "#333",
      path: [{ z: -GRID_SIZE }, { z: GRID_SIZE }],
    });

    for (let i = -GRID_SIZE; i <= GRID_SIZE; i += GRID_CELL_SIZE) {
      grid.copy({
        path: [
          { x: -GRID_SIZE, z: i },
          { x: GRID_SIZE, z: i },
        ],
      });

      grid.copy({
        path: [
          { x: i, z: -GRID_SIZE },
          { x: i, z: GRID_SIZE },
        ],
      });
    }
  }, []);

  const resize = useCallback(() => {
    if (!canvas.current) return;
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    viewport.current?.updateRenderGraph();
  }, []);

  useEffect(() => {
    if (!canvas.current || viewport.current) return;
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    window.addEventListener("resize", resize);

    const illo = new Illustration({
      element: canvas.current,
      dragRotate: true,
      onDragMove: () => {
        viewport.current?.updateRenderGraph();
        updateRotation({
          x: viewport.current?.rotate.x || 0,
          y: viewport.current?.rotate.y || 0,
          z: viewport.current?.rotate.z || 0,
        });
      },
    });

    drawGrid(illo);
    illo.updateRenderGraph();

    viewport.current = illo;

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [drawGrid, resize, updateRotation]);

  useEffect(() => {
    if (!viewport.current || !camera) return;
    viewport.current.rotate.x = camera.rotation.x;
    viewport.current.rotate.y = camera.rotation.y;
    viewport.current.rotate.z = camera.rotation.z;
    viewport.current.updateRenderGraph();
  }, [camera]);

  return <canvas ref={canvas} />;
};

export default Viewport;
