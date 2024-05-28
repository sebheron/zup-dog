import { TAU, VectorOptions } from "zdog";

// Quaternion class (with normalization added)
class Quaternion {
  constructor(
    private qx = 0,
    private qy = 0,
    private qz = 0,
    private qw = 1,
  ) {}

  static fromEuler(euler: VectorOptions): Quaternion {
    const x = ((euler.x ?? 0) % TAU) / 2;
    const y = ((euler.y ?? 0) % TAU) / 2;
    const z = ((euler.z ?? 0) % TAU) / 2;

    const cX = Math.cos(x);
    const cY = Math.cos(y);
    const cZ = Math.cos(z);
    const sX = Math.sin(x);
    const sY = Math.sin(y);
    const sZ = Math.sin(z);

    return new Quaternion(
      sX * cY * cZ + cX * sY * sZ,
      cX * sY * cZ - sX * cY * sZ,
      cX * cY * sZ + sX * sY * cZ,
      cX * cY * cZ - sX * sY * sZ,
    ).normalize();
  }

  multiply(q: Quaternion): Quaternion {
    return new Quaternion(
      this.qw * q.qx + this.qx * q.qw + this.qy * q.qz - this.qz * q.qy,
      this.qw * q.qy - this.qx * q.qz + this.qy * q.qw + this.qz * q.qx,
      this.qw * q.qz + this.qx * q.qy - this.qy * q.qx + this.qz * q.qw,
      this.qw * q.qw - this.qx * q.qx - this.qy * q.qy - this.qz * q.qz,
    ).normalize();
  }

  addEuler(euler: VectorOptions) {
    const other = this.multiply(Quaternion.fromEuler(euler));
    this.qx = other.qx;
    this.qy = other.qy;
    this.qz = other.qz;
    this.qw = other.qw;
  }

  setEuler(euler: VectorOptions) {
    const other = Quaternion.fromEuler(euler);
    this.qx = other.qx;
    this.qy = other.qy;
    this.qz = other.qz;
    this.qw = other.qw;
  }

  normalize(): Quaternion {
    const length = Math.sqrt(
      this.qx * this.qx +
        this.qy * this.qy +
        this.qz * this.qz +
        this.qw * this.qw,
    );
    if (length === 0) {
      this.qx = this.qy = this.qz = 0;
      this.qw = 1;
    } else {
      this.qx /= length;
      this.qy /= length;
      this.qz /= length;
      this.qw /= length;
    }
    return this;
  }

  get x() {
    const t0 = 2.0 * (this.qw * this.qx + this.qy * this.qz);
    const t1 = 1.0 - 2.0 * (this.qx * this.qx + this.qy * this.qy);
    return Math.atan2(t0, t1);
  }

  get y() {
    let t2 = 2.0 * (this.qw * this.qy - this.qz * this.qx);
    t2 = t2 > 1.0 ? 1.0 : t2;
    t2 = t2 < -1.0 ? -1.0 : t2;
    return Math.asin(t2);
  }

  get z() {
    const t3 = 2.0 * (this.qw * this.qz + this.qx * this.qy);
    const t4 = 1.0 - 2.0 * (this.qy * this.qy + this.qz * this.qz);
    return Math.atan2(t3, t4);
  }
}

export default Quaternion;
