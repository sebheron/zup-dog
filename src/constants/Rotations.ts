import Colors from "./Colors";

const Rotations = {
  X: {
    color: Colors.XAXIS,
    start: { x: 0, y: 0, z: 1 },
    arc: { x: 0, y: -1, z: 1 },
    end: { x: 0, y: -1, z: 0 },
  },
  Y: {
    color: Colors.YAXIS,
    start: { x: 0, y: 0, z: 1 },
    arc: { x: 1, y: 0, z: 1 },
    end: { x: 1, y: 0, z: 0 },
  },
  Z: {
    color: Colors.ZAXIS,
    start: { x: 0, y: -1, z: 0 },
    arc: { x: 1, y: -1, z: 0 },
    end: { x: 1, y: 0, z: 0 },
  },
};

export type RotationType = keyof typeof Rotations;

export default Rotations;
