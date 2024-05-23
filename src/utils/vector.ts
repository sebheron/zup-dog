import VectorType from "../types/VectorType";

const shift = (pos: VectorType, mouseX: number, mouseY: number) => ({
  x: pos.x + mouseX,
  y: pos.y + mouseY,
  z: pos.z,
});

const spin = (rot: VectorType, mouseX: number, mouseY: number) => ({
  x: rot.x + mouseY * Math.PI * -1,
  y: rot.y + mouseX * Math.PI * -1,
  z: rot.z,
});

const vector = {
  shift,
  spin,
};

export default vector;
