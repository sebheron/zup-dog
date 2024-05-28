import QuaternionType from "@/types/QuaternionType";
import Vector3Type from "@/types/Vector3Type";

const fromEuler = ({ x, y, z }: Vector3Type): QuaternionType => {
  const c1 = Math.cos(x / 2);
  const c2 = Math.cos(y / 2);
  const c3 = Math.cos(z / 2);
  const s1 = Math.sin(x / 2);
  const s2 = Math.sin(y / 2);
  const s3 = Math.sin(z / 2);

  return {
    x: s1 * c2 * c3 + c1 * s2 * s3,
    y: c1 * s2 * c3 - s1 * c2 * s3,
    z: c1 * c2 * s3 + s1 * s2 * c3,
    w: c1 * c2 * c3 - s1 * s2 * s3,
  };
};

const toEuler = ({ x, y, z, w }: QuaternionType): Vector3Type => {
  const t0 = 2.0 * (w * x + y * z);
  const t1 = 1.0 - 2.0 * (x * x + y * y);
  const t2 = 2.0 * (w * y - z * x);
  const t3 = t2 > 1 ? 1 : t2 < -1 ? -1 : t2;
  const t4 = 2.0 * (w * z + x * y);
  const t5 = 1.0 - 2.0 * (y * y + z * z);

  return {
    x: Math.atan2(t4, t5),
    y: Math.asin(t3),
    z: Math.atan2(t0, t1),
  };
};

const multiply = (a: QuaternionType, b: QuaternionType): QuaternionType => {
  return {
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
  };
};

const quaternion = {
  fromEuler,
  toEuler,
  multiply,
};

export default quaternion;
