import { TAU } from "zdog";
import Vector3Type from "../types/Vector3Type";

const rotate = (offset: Vector3Type, rotation: Vector3Type) => {
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

const inverseRotate = (offset: Vector3Type, rotation: Vector3Type) => {
  const { x, y, z } = offset;
  const { x: rx, y: ry, z: rz } = rotation;

  // Inverse of z-axis rotation
  const x1 = x * Math.cos(-rz) - y * Math.sin(-rz);
  const y1 = x * Math.sin(-rz) + y * Math.cos(-rz);

  // Inverse of y-axis rotation
  const x2 = x1 * Math.cos(ry) - z * Math.sin(ry);
  const z2 = -x1 * Math.sin(ry) - z * Math.cos(ry);

  // Inverse of x-axis rotation
  const y3 = y1 * Math.cos(-rx) - z2 * Math.sin(-rx);
  const z3 = y1 * Math.sin(-rx) + z2 * Math.cos(-rx);

  return {
    x: x2,
    y: y3,
    z: z3,
  };
};

const scale = (vector: Partial<Vector3Type>, scalar: number) => ({
  x: (vector.x ?? 0) * scalar,
  y: (vector.y ?? 0) * scalar,
  z: (vector.z ?? 0) * scalar,
});

const add = (...vectors: Partial<Vector3Type>[]) => {
  const result = { x: 0, y: 0, z: 0 };
  vectors.forEach((vector) => {
    result.x += vector.x ?? 0;
    result.y += vector.y ?? 0;
    result.z += vector.z ?? 0;
  });
  return result;
};

const subtract = (a: Partial<Vector3Type>, b: Partial<Vector3Type>) => ({
  x: (a.x ?? 0) - (b.x ?? 0),
  y: (a.y ?? 0) - (b.y ?? 0),
  z: (a.z ?? 0) - (b.z ?? 0),
});

const multiply = (a: Partial<Vector3Type>, b: Partial<Vector3Type>) => ({
  x: (a.x ?? 0) * (b.x ?? 0),
  y: (a.y ?? 0) * (b.y ?? 0),
  z: (a.z ?? 0) * (b.z ?? 0),
});

const shift = (pos: Vector3Type, mouseX: number, mouseY: number) => ({
  x: pos.x + mouseX,
  y: pos.y + mouseY,
  z: pos.z,
});

const spin = (rot: Vector3Type, mouseX: number, mouseY: number) => ({
  x: Math.max(Math.min(rot.x + mouseY * Math.PI * -1, TAU / 4), -TAU / 4),
  y: (rot.y + mouseX * Math.PI * -1) % TAU,
  z: Math.max(Math.min(rot.z, TAU / 4), -TAU / 4),
});

const mouseToWorld = (
  rotation: Vector3Type,
  zoom: number,
  mouseX: number,
  mouseY: number,
) => {
  return rotate(
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

const worldToScreen = (
  rotation: Vector3Type,
  position: Vector3Type,
  zoom: number,
  worldPoint: Vector3Type,
) => {
  const offset =
    0.25 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const rotated = inverseRotate(worldPoint, rotation);
  const moved = vector.add(rotated, position);
  const scaled = vector.scale(moved, zoom);
  return {
    x: scaled.x - offset + window.innerWidth / 2,
    y: scaled.y - offset + window.innerHeight / 2,
  };
};

const vector = {
  scale,
  add,
  subtract,
  multiply,
  shift,
  spin,
  mouseToWorld,
  worldToScreen,
};

export default vector;
