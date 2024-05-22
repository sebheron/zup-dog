import VectorType from "../types/VectorType";

export const add = (
  a?: Partial<VectorType> | null,
  b?: Partial<VectorType> | null,
) => ({
  x: (a?.x ?? 0) + (b?.x ?? 0),
  y: (a?.y ?? 0) + (b?.y ?? 0),
  z: (a?.z ?? 0) + (b?.z ?? 0),
});

export const shift = (pos: VectorType, mouseX: number, mouseY: number) => ({
  x: pos.x + mouseX,
  y: pos.y + mouseY,
  z: pos.z,
});

export const spin = (rot: VectorType, mouseX: number, mouseY: number) => ({
  x: rot.x + mouseY * Math.PI * -1,
  y: rot.y + mouseX * Math.PI * -1,
  z: rot.z,
});
