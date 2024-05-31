import Quaternion from "quaternion";
import { TAU } from "zdog";
import Vector2Type from "@/types/Vector2Type";
import Vector3Type from "@/types/Vector3Type";

const globalRotate = (
  localRotation: Vector3Type,
  globalRotationAmount: Vector3Type,
) => {
  const quat = Quaternion.fromEuler(
    globalRotationAmount.x,
    globalRotationAmount.y,
    globalRotationAmount.z,
    "ZYX",
  );
  const rot = quat.mul(
    Quaternion.fromEuler(
      localRotation.x,
      localRotation.y,
      localRotation.z,
      "ZYX",
    ),
  );
  const [x, y, z] = rot.toEuler("ZYX");
  return { x, y, z };
};

const rotateAround = (
  center: Vector3Type,
  point: Vector3Type,
  rotation: Vector3Type,
) => {
  const { x, y, z } = point;
  const { x: rx, y: ry, z: rz } = rotation;

  const x1 = x - center.x;
  const y1 = y - center.y;
  const z1 = z - center.z;

  const x2 = x1 * Math.cos(rz) - y1 * Math.sin(rz);
  const y2 = x1 * Math.sin(rz) + y1 * Math.cos(rz);

  const x3 = x2 * Math.cos(ry) + z1 * Math.sin(ry);
  const z3 = -x2 * Math.sin(ry) + z1 * Math.cos(ry);

  const x4 = x3 * Math.cos(rx) - y2 * Math.sin(rx);
  const y4 = x3 * Math.sin(rx) + y2 * Math.cos(rx);

  return {
    x: x4 + center.x,
    y: y4 + center.y,
    z: z3 + center.z,
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
  const x = mouseX * (1 / zoom);
  const y = mouseY * (1 / zoom);
  const { x: rx, y: ry, z: rz } = rotation;

  const y1 = y * Math.cos(-rx);
  const z1 = y * Math.sin(-rx);

  const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
  const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);

  const x3 = x2 * Math.cos(-rz) - y1 * Math.sin(-rz);
  const y3 = x2 * Math.sin(-rz) + y1 * Math.cos(-rz);

  return {
    x: x3,
    y: y3,
    z: z2,
  };
};

const worldToScreen = (
  rotation: Vector3Type,
  position: Vector3Type,
  zoom: number,
  worldPoint: Vector3Type,
) => {
  const { x, y, z } = worldPoint;
  const { x: rx, y: ry, z: rz } = rotation;

  const x1 = x * Math.cos(-rz) - y * Math.sin(-rz);
  const y1 = x * Math.sin(-rz) + y * Math.cos(-rz);

  const x2 = x1 * Math.cos(ry) - z * Math.sin(ry);
  const z2 = -x1 * Math.sin(ry) - z * Math.cos(ry);

  const y3 = y1 * Math.cos(-rx) - z2 * Math.sin(-rx);
  const z3 = y1 * Math.sin(-rx) + z2 * Math.cos(-rx);

  const rotated = { x: x2, y: y3, z: z3 };
  const moved = vector.add(rotated, position);
  const scaled = vector.scale(moved, zoom);

  const padding =
    0.25 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  return {
    x: scaled.x - padding + window.innerWidth / 2,
    y: scaled.y - padding + window.innerHeight / 2,
  };
};

const angle2d = (a: Vector2Type, b: Vector2Type) =>
  Math.atan2(b.y - a.y, b.x - a.x);

const angleBetween = (
  center: Vector3Type,
  position: Vector3Type,
): Vector3Type => {
  const dx = position.x - center.x;
  const dy = position.y - center.y;
  const dz = position.z - center.z;

  return {
    x: Math.atan2(dy, dx),
    y: Math.atan2(dz, dx),
    z: Math.atan2(dy, -dz),
  };
};

const angleDelta = (
  center: Vector3Type,
  offset: Vector3Type,
  previousOffset: Vector3Type,
): Vector3Type => {
  const currentAngle = angleBetween(center, offset);
  const previousAngle = angleBetween(center, previousOffset);

  const angleDelta = subtract(currentAngle, previousAngle);

  if (angleDelta.x > Math.PI) {
    angleDelta.x -= TAU;
  } else if (angleDelta.x < -Math.PI) {
    angleDelta.x += TAU;
  }

  if (angleDelta.y > Math.PI) {
    angleDelta.y -= TAU;
  } else if (angleDelta.y < -Math.PI) {
    angleDelta.y += TAU;
  }

  if (angleDelta.z > Math.PI) {
    angleDelta.z -= TAU;
  } else if (angleDelta.z < -Math.PI) {
    angleDelta.z += TAU;
  }

  return {
    x: angleDelta.x,
    y: angleDelta.y,
    z: angleDelta.z,
  };
};

const nearestPoint = (
  start: Vector2Type,
  end: Vector2Type,
  point: Vector2Type,
) => {
  // Direction vector of the line
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Vector from p1 to the point p
  const apx = point.x - start.x;
  const apy = point.y - start.y;

  // Dot product of AP and the direction vector
  const ap_dot_d = apx * dx + apy * dy;

  // Dot product of the direction vector with itself
  const d_dot_d = dx * dx + dy * dy;

  // Parameter t of the projection
  const t = ap_dot_d / d_dot_d;

  // Nearest point on the line
  const nearestX = start.x + t * dx;
  const nearestY = start.y + t * dy;

  return { x: nearestX, y: nearestY };
};

const direction2d = (a: Vector2Type, b: Vector2Type) =>
  Math.hypot(a.x - b.x, a.y - b.y) *
  (Math.sign(a.x - b.x) || Math.sign(a.y - b.y));

const vector = {
  globalRotate,
  rotateAround,
  scale,
  add,
  subtract,
  multiply,
  shift,
  spin,
  mouseToWorld,
  worldToScreen,
  angle2d,
  angleBetween,
  angleDelta,
  nearestPoint,
  direction2d,
};

export default vector;
