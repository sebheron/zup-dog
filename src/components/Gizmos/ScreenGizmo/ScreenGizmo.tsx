import { useState } from "react";
import { Illustration, Shape } from "react-zdog";
import { TAU } from "zdog";
import useCamera from "@/components/Camera/useCamera";
import Dolly from "@/components/Dolly/Dolly";
import VectorType from "@/types/VectorType";
import styles from "./ScreenGizmo.module.css";

type GizmoBall = {
  color: string;
  offset?: VectorType;
  targetRotation?: VectorType;
  targetPosition?: VectorType;
};

const CAPS: GizmoBall[] = [
  { color: "#7c59ae" },
  {
    color: "#f00",
    offset: { x: 30, y: 0, z: 0 },
    targetRotation: { x: 0, y: TAU / 4, z: 0 },
    targetPosition: { x: 30, y: 0, z: 0 },
  },
  {
    color: "#505050",
    offset: { x: -30, y: 0, z: 0 },
    targetRotation: { x: 0, y: -TAU / 4, z: 0 },
    targetPosition: { x: -30, y: 0, z: 0 },
  },
  {
    color: "#0f0",
    offset: { x: 0, y: -30, z: 0 },
    targetRotation: { x: -TAU / 4, y: 0, z: 0 },
    targetPosition: { x: 0, y: -30, z: 0 },
  },
  {
    color: "#505050",
    offset: { x: 0, y: 30, z: 0 },
    targetRotation: { x: TAU / 4, y: 0, z: 0 },
    targetPosition: { x: 0, y: 30, z: 0 },
  },
  {
    color: "#4c41c8",
    offset: { x: 0, y: 0, z: 30 },
    targetRotation: { x: 0, y: 0, z: 0 },
    targetPosition: { x: 0, y: 0, z: 30 },
  },
  {
    color: "#505050",
    offset: { x: 0, y: 0, z: -30 },
    targetRotation: { x: 0, y: -TAU / 2, z: 0 },
    targetPosition: { x: 0, y: 0, z: -30 },
  },
];

const Gizmo = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { lerpTo } = useCamera();

  return (
    <div className={styles.gizmo}>
      <Illustration className={styles.illo} element="canvas">
        <Dolly canRotate>
          <Shape stroke={2} color={"#f00"} path={[{}, { x: 30 }]} />
          <Shape stroke={2} color={"#0f0"} path={[{}, { y: -30 }]} />
          <Shape stroke={2} color={"#4c41c8"} path={[{}, { z: 30 }]} />
          {CAPS.map((cap, index) => (
            <Shape
              key={index}
              stroke={hoverIndex === index ? 14 : 10}
              color={cap.color}
              translate={cap.offset}
            />
          ))}
        </Dolly>
      </Illustration>
      <Illustration className={styles.hidden} pointerEvents element="canvas">
        <Dolly canRotate>
          {CAPS.map(
            (cap, index) =>
              !!cap.targetRotation &&
              !!cap.targetPosition && (
                <Shape
                  key={index}
                  stroke={20}
                  translate={cap.offset}
                  onPointerEnter={() => setHoverIndex(index)}
                  onPointerLeave={() => setHoverIndex(null)}
                  onClick={() =>
                    lerpTo(cap.targetPosition!, cap.targetRotation!, 1000)
                  }
                />
              ),
          )}
        </Dolly>
      </Illustration>
    </div>
  );
};

export default Gizmo;
