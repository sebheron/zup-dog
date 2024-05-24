import { TAU } from "zdog";
import VectorType from "../types/VectorType";

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

const vector = {
  scale,
  add,
  shift,
  spin,
};

export default vector;
