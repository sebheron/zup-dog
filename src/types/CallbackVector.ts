class CallbackVector {
  constructor(
    private xcb: () => number,
    private ycb: () => number,
    private zcb: () => number,
  ) {}

  get x() {
    return this.xcb();
  }

  get y() {
    return this.ycb();
  }

  get z() {
    return this.zcb();
  }
}

export default CallbackVector;
