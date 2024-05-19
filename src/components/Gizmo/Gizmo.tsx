import { useCallback, useEffect, useRef } from "react";
import { Illustration, Shape } from "zdog";

import { useCamera } from "../Camera/Camera";
import styles from "./Gizmo.module.css";

const GIZMO_COLORS = {
  CENTER: "#7c59ae",
  X: "#f00",
  Y: "#0f0",
  Z: "#4c41c8",
  DEFAULT: "#505050",
};

const Gizmo = () => {
  const camera = useCamera();

  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const gizmo = useRef<Illustration | null>(null);

  const drawAxes = useCallback((illo: Illustration) => {
    //Center
    const cap = new Shape({
      addTo: illo,
      stroke: 10,
      color: GIZMO_COLORS.CENTER,
    });

    //X Axis
    cap.copy({
      translate: { x: 30 },
      color: GIZMO_COLORS.X,
    });

    //Y Axis
    cap.copy({
      translate: { y: -30 },
      color: GIZMO_COLORS.Y,
    });

    //Z Axis
    cap.copy({
      translate: { z: 30 },
      color: GIZMO_COLORS.Z,
    });

    //Negative X Axis
    const negative = cap.copy({
      translate: { x: -30 },
      stroke: 8,
      color: GIZMO_COLORS.DEFAULT,
    });

    //Negative Y Axis
    negative.copy({
      translate: { y: 30 },
      color: GIZMO_COLORS.DEFAULT,
    });

    //Negative Z Axis
    negative.copy({
      translate: { z: -30 },
      color: GIZMO_COLORS.DEFAULT,
    });
  }, []);

  const drawLines = useCallback((illo: Illustration) => {
    const line = new Shape({
      addTo: illo,
      stroke: 2,
      color: GIZMO_COLORS.X,
      path: [
        { x: 0, y: 0 },
        { x: 25, y: 0 },
      ],
    });

    line.copy({
      color: GIZMO_COLORS.Y,
      path: [
        { x: 0, y: 0 },
        { x: 0, y: -25 },
      ],
    });

    line.copy({
      color: GIZMO_COLORS.Z,
      path: [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 25 },
      ],
    });
  }, []);

  useEffect(() => {
    if (!canvas.current || !container.current || gizmo.current) return;
    const { width, height } = container.current.getBoundingClientRect();
    canvas.current.width = width;
    canvas.current.height = height;

    const illo = new Illustration({
      element: canvas.current,
    });

    drawAxes(illo);
    drawLines(illo);
    illo.updateRenderGraph();

    gizmo.current = illo;
  }, [drawAxes, drawLines]);

  useEffect(() => {
    if (!gizmo.current || !camera) return;
    gizmo.current.rotate.x = camera.rotation.x;
    gizmo.current.rotate.y = camera.rotation.y;
    gizmo.current.rotate.z = camera.rotation.z;
    gizmo.current.updateRenderGraph();
  }, [camera]);

  return (
    <div className={styles.gizmo} ref={container}>
      <canvas className={styles.gizmo} ref={canvas} />
    </div>
  );
};

export default Gizmo;
