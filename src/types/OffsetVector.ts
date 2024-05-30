import { Vector, VectorOptions } from "zdog";

class OffsetVector {
  private value: Vector;
  private offset: Vector;

  constructor(vec?: Vector, offset?: Vector) {
    this.value = vec ?? new Vector();
    this.offset = offset ?? new Vector();
  }

  set(vec: VectorOptions) {
    this.value.set(vec);
  }

  add(vec: VectorOptions) {
    this.value.add(vec);
  }

  get x() {
    return this.value.x + this.offset.x;
  }

  get y() {
    return this.value.y + this.offset.y;
  }

  get z() {
    return this.value.z + this.offset.z;
  }
}

export default OffsetVector;
