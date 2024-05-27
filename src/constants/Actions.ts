import { TAU } from "zdog";
import Colors from "./Colors";

export const Rotations = {
  XR: {
    color: Colors.XAXIS,
    direction: { x: 1, y: 0, z: 0 },
    start: { x: 0, y: 0, z: 1 },
    arc: { x: 0, y: -1, z: 1 },
    end: { x: 0, y: -1, z: 0 },
  },
  YR: {
    color: Colors.YAXIS,
    direction: { x: 0, y: 1, z: 0 },
    start: { x: 0, y: 0, z: 1 },
    arc: { x: 1, y: 0, z: 1 },
    end: { x: 1, y: 0, z: 0 },
  },
  ZR: {
    color: Colors.ZAXIS,
    direction: { x: 0, y: 0, z: 1 },
    start: { x: 0, y: -1, z: 0 },
    arc: { x: 1, y: -1, z: 0 },
    end: { x: 1, y: 0, z: 0 },
  },
};

export const Translations = {
  XT: {
    color: Colors.XAXIS,
    direction: { x: 1, y: 0, z: 0 },
    rotation: { y: -TAU / 4 },
  },
  YT: {
    color: Colors.YAXIS,
    direction: { x: 0, y: -1, z: 0 },
    rotation: { x: TAU / 4 },
  },
  ZT: {
    color: Colors.ZAXIS,
    direction: { x: 0, y: 0, z: 1 },
    rotation: {},
  },
};

export type RotationType = keyof typeof Rotations;
export type TranslationType = keyof typeof Translations;
export type ActionType = RotationType | TranslationType;
