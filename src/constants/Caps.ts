import { TAU } from "zdog";
import GizmoCap from "@/types/GizmoCap";
import Colors from "./Colors";

const CAPS: Record<string, GizmoCap> = {
  XPOS: {
    color: Colors.XAXIS,
    offset: { x: 30, y: 0, z: 0 },
    targetRotation: { x: 0, y: TAU / 4, z: 0 },
    targetPosition: { x: 30, y: 0, z: 0 },
  },
  XNEG: {
    color: Colors.GRID,
    offset: { x: -30, y: 0, z: 0 },
    targetRotation: { x: 0, y: -TAU / 4, z: 0 },
    targetPosition: { x: -30, y: 0, z: 0 },
  },
  YPOS: {
    color: Colors.YAXIS,
    offset: { x: 0, y: -30, z: 0 },
    targetRotation: { x: -TAU / 4, y: 0, z: 0 },
    targetPosition: { x: 0, y: -30, z: 0 },
  },
  YNEG: {
    color: Colors.GRID,
    offset: { x: 0, y: 30, z: 0 },
    targetRotation: { x: TAU / 4, y: 0, z: 0 },
    targetPosition: { x: 0, y: 30, z: 0 },
  },
  ZPOS: {
    color: Colors.ZAXIS,
    offset: { x: 0, y: 0, z: 30 },
    targetRotation: { x: 0, y: 0, z: 0 },
    targetPosition: { x: 0, y: 0, z: 30 },
  },
  ZNEG: {
    color: Colors.GRID,
    offset: { x: 0, y: 0, z: -30 },
    targetRotation: { x: 0, y: -TAU / 2, z: 0 },
    targetPosition: { x: 0, y: 0, z: -30 },
  },
};

export type Cap = keyof typeof CAPS;

export default CAPS;
