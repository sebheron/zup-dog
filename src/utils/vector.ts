import VectorType from "../types/VectorType";

export const shift = (
  pos: VectorType,
  rot: VectorType,
  mouseX: number,
  mouseY: number,
) => {
  const right = {
    x: Math.cos(rot.y),
    y: 0,
    z: -Math.sin(rot.y),
  };
  const up = {
    x: Math.sin(rot.x) * Math.sin(rot.y),
    y: Math.cos(rot.x),
    z: Math.sin(rot.x) * Math.cos(rot.y),
  };
  return {
    x: pos.x + right.x * mouseX + up.x * mouseY,
    y: pos.y + right.y * mouseX + up.y * mouseY,
    z: pos.z + right.z * mouseX + up.z * mouseY,
  };
};

export const spin = (rot: VectorType, mouseX: number, mouseY: number) => ({
  x: rot.x + mouseY * Math.PI * -1,
  y: rot.y + mouseX * Math.PI * -1,
  z: rot.z,
});
