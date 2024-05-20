import { useState } from "react";
import { Illustration, Shape } from "react-zdog";
import { TAU } from "zdog";

import useCamera from "../Camera/useCamera";
import VectorType from "../../types/VectorType";
import Dolly from "../Dolly/Dolly";
import styles from "./Gizmo.module.css";

type GizmoBall = {
  color: string;
  hoverColor: string;
  offset?: VectorType;
  targetRotation?: VectorType;
  targetPosition?: VectorType;
};

const balls: GizmoBall[] = [
  { color: "#7c59ae", hoverColor: "#a98ac7" },
  {
    color: "#f00",
    hoverColor: "#f77",
    offset: { x: 30, y: 0, z: 0 },
    targetRotation: { x: 0, y: TAU / 4, z: 0 },
  },
  {
    color: "#505050",
    hoverColor: "#777",
    offset: { x: -30, y: 0, z: 0 },
    targetRotation: { x: 0, y: -TAU / 4, z: 0 },
  },
  {
    color: "#0f0",
    hoverColor: "#7f7",
    offset: { x: 0, y: -30, z: 0 },
    targetRotation: { x: -TAU / 4, y: 0, z: 0 },
  },
  {
    color: "#505050",
    hoverColor: "#777",
    offset: { x: 0, y: 30, z: 0 },
    targetRotation: { x: TAU / 4, y: 0, z: 0 },
  },
  {
    color: "#4c41c8",
    hoverColor: "#8c7",
    offset: { x: 0, y: 0, z: 30 },
    targetRotation: { x: 0, y: 0, z: 0 },
  },
  {
    color: "#505050",
    hoverColor: "#777",
    offset: { x: 0, y: 0, z: -30 },
    targetRotation: { x: 0, y: -TAU / 2, z: 0 },
  },
];

const Gizmo = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { lerpRotation, lerpPosition } = useCamera();

  return (
    <div className={styles.gizmo}>
      <Illustration className={styles.illo} element="canvas">
        <Dolly canRotate>
          <Shape stroke={2} color={"#f00"} path={[{}, { x: 30 }]} />
          <Shape stroke={2} color={"#0f0"} path={[{}, { y: -30 }]} />
          <Shape stroke={2} color={"#4c41c8"} path={[{}, { z: 30 }]} />
          {balls.map((ball, index) => (
            <Shape
              key={index}
              stroke={10}
              color={hoverIndex === index ? ball.hoverColor : ball.color}
              translate={ball.offset}
            />
          ))}
        </Dolly>
      </Illustration>
      <Illustration className={styles.hidden} pointerEvents element="canvas">
        <Dolly canRotate>
          {balls.map(
            (ball, index) =>
              !!ball.targetRotation &&
              !ball.targetPosition && (
                <Shape
                  key={index}
                  stroke={25}
                  translate={ball.offset}
                  onPointerEnter={() => setHoverIndex(index)}
                  onPointerLeave={() => setHoverIndex(null)}
                  onClick={() => {
                    lerpRotation(ball.targetRotation!, 1000);
                    lerpPosition(ball.targetPosition!, 1000);
                  }}
                />
              )
          )}
        </Dolly>
      </Illustration>
    </div>
  );
};

export default Gizmo;
