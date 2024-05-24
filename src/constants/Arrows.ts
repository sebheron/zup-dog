import { TAU } from "zdog";
import GizmoArrow from "@/types/GizmoArrow";
import Colors from "./Colors";

const Arrows: Record<string, GizmoArrow> = {
  X: {
    color: Colors.XAXIS,
    direction: { x: 1, y: 0, z: 0 },
    rotation: { y: -TAU / 4 },
  },
  Y: {
    color: Colors.YAXIS,
    direction: { x: 0, y: -1, z: 0 },
    rotation: { x: TAU / 4 },
  },
  Z: {
    color: Colors.ZAXIS,
    direction: { x: 0, y: 0, z: 1 },
  },
};

export type Arrow = keyof typeof Arrows;

export default Arrows;
