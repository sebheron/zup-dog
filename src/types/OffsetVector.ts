import { Vector } from "zdog";
import Vector3Type from "./Vector3Type";

class OffsetVector {
  private value: Vector;
  private offset: Vector;

  constructor(vec?: Vector, offset?: Vector) {
    this.value = vec ?? new Vector();
    this.offset = offset ?? new Vector();
  }

  set(vec: Partial<Vector3Type>) {
    this.value.set(vec);
  }

  add(vec: Partial<Vector3Type>) {
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
