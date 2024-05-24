import VectorType from "@/types/VectorType";

const rotateOffset = (offset: VectorType, rotation: VectorType): VectorType => {
  const { x, y, z } = offset;
  const { x: rx, y: ry, z: rz } = rotation;

  // Rotation around z-axis
  const x1 = x * Math.cos(rz) - y * Math.sin(rz);
  const y1 = x * Math.sin(rz) + y * Math.cos(rz);

  // Rotation around y-axis (inverting y-direction)
  const x2 = x1 * Math.cos(ry) + z * Math.sin(ry);
  const z1 = -x1 * Math.sin(ry) + z * Math.cos(ry);

  // Rotation around x-axis
  const y2 = y1 * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 = y1 * Math.sin(rx) + z1 * Math.cos(rx);

  // Invert y2 back to the original direction
  return {
    x: x2,
    y: -y2, // Inverting back the y-direction after rotations
    z: z2,
  };
};

const drag = (
  centerRotation: VectorType,
  zoom: number,
  mouseX: number,
  mouseY: number,
): VectorType => {
  // Convert mouse movement to a 3D vector in screen space
  let mouseMove = {
    x: mouseX * 0.8 * (1 / zoom),
    y: mouseY * 0.8 * (1 / zoom),
    z: 0,
  };

  mouseMove = rotateOffset(mouseMove, centerRotation);

  return {
    x: mouseMove.x,
    y: mouseMove.y,
    z: mouseMove.z,
  };
};
export default drag;
