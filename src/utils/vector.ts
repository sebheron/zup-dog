import { TAU } from "zdog";
import VectorType from "../types/VectorType";

const rotate = (offset: VectorType, rotation: VectorType) => {
  const { x, y, z } = offset;
  const { x: rx, y: ry, z: rz } = rotation;

  const y1 = y * Math.cos(rx) - z * Math.sin(rx);
  const z1 = y * Math.sin(rx) + z * Math.cos(rx);

  const x2 = x * Math.cos(-ry) + z1 * Math.sin(-ry);
  const z2 = -x * Math.sin(-ry) + z1 * Math.cos(-ry);

  const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
  const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);

  return {
    x: x3,
    y: y3,
    z: z2,
  };
};

const scale = (vector: Partial<VectorType>, scalar: number) => ({
  x: (vector.x ?? 0) * scalar,
  y: (vector.y ?? 0) * scalar,
  z: (vector.z ?? 0) * scalar,
});

const add = (...vectors: Partial<VectorType>[]) => {
  const result = { x: 0, y: 0, z: 0 };
  vectors.forEach((vector) => {
    result.x += vector.x ?? 0;
    result.y += vector.y ?? 0;
    result.z += vector.z ?? 0;
  });
  return result;
};

const subtract = (a: Partial<VectorType>, b: Partial<VectorType>) => ({
  x: (a.x ?? 0) - (b.x ?? 0),
  y: (a.y ?? 0) - (b.y ?? 0),
  z: (a.z ?? 0) - (b.z ?? 0),
});

const multiply = (a: Partial<VectorType>, b: Partial<VectorType>) => ({
  x: (a.x ?? 0) * (b.x ?? 0),
  y: (a.y ?? 0) * (b.y ?? 0),
  z: (a.z ?? 0) * (b.z ?? 0),
});

const shift = (pos: VectorType, mouseX: number, mouseY: number) => ({
  x: pos.x + mouseX,
  y: pos.y + mouseY,
  z: pos.z,
});

const spin = (rot: VectorType, mouseX: number, mouseY: number) => ({
  x: Math.max(Math.min(rot.x + mouseY * Math.PI * -1, TAU / 4), -TAU / 4),
  y: (rot.y + mouseX * Math.PI * -1) % TAU,
  z: Math.max(Math.min(rot.z, TAU / 4), -TAU / 4),
});

const moveWithMouse = (
  rotation: VectorType,
  zoom: number,
  mouseX: number,
  mouseY: number,
) => {
  return vector.rotate(
    {
      x: mouseX * (1 / zoom),
      y: mouseY * (1 / zoom),
      z: 0,
    },
    {
      x: -rotation.x,
      y: -rotation.y,
      z: -rotation.z,
    },
  );
};

const vector = {
  rotate,
  scale,
  add,
  subtract,
  multiply,
  shift,
  spin,
  moveWithMouse,
};

export default vector;
