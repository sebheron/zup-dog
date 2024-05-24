import {
  Anchor,
  Box,
  Cone,
  Cylinder,
  Ellipse,
  Group,
  Hemisphere,
  Polygon,
  Rect,
  RoundedRect,
  Shape,
} from "react-zdog-alt";
import {
  AnchorOptions,
  BoxOptions,
  ConeOptions,
  CylinderOptions,
  EllipseOptions,
  GroupOptions,
  HemisphereOptions,
  PolygonOptions,
  RectOptions,
  RoundedRectOptions,
  ShapeOptions,
} from "zdog";
import ObjectType from "@/types/ObjectType";
import MustDeclare from "../types/utility/MustDeclare";

const DEFAULT_ANCHOR: MustDeclare<AnchorOptions> = {
  addTo: null,
  translate: { x: 0, y: 0, z: 0 },
  rotate: { x: 0, y: 0, z: 0 },
  scale: 1,
};

const DEFAULT_SHAPE: MustDeclare<ShapeOptions> = {
  ...DEFAULT_ANCHOR,
  color: "#E62",
  stroke: 0,
  fill: true,
  closed: false,
  visible: true,
  backface: true,
  front: { x: 0, y: 0, z: 1 },
  path: [{ x: 0, y: 0, z: 0 }],
};

const DEFAULT_RECT: MustDeclare<RectOptions> = {
  ...DEFAULT_SHAPE,
  width: 64,
  height: 64,
};

const DEFAULT_ELLIPSE: MustDeclare<EllipseOptions> = {
  ...DEFAULT_SHAPE,
  diameter: 64,
  width: 64,
  height: 64,
  quarters: 4,
};

const SHAPE: ObjectType<typeof Shape, ShapeOptions> = {
  shape: "Shape",
  component: Shape,
  props: {
    ...DEFAULT_SHAPE,
    stroke: 64,
  },
};

const BOX: ObjectType<typeof Box, BoxOptions> = {
  shape: "Box",
  component: Box,
  props: {
    ...DEFAULT_RECT,
    depth: 64,
    frontFace: true,
    rearFace: true,
    leftFace: true,
    rightFace: true,
    topFace: true,
    bottomFace: true,
  },
};

const CONE: ObjectType<typeof Cone, ConeOptions> = {
  shape: "Cone",
  component: Cone,
  props: {
    ...DEFAULT_ELLIPSE,
    length: 64,
  },
};

const RECT: ObjectType<typeof Rect, RectOptions> = {
  shape: "Rectangle",
  component: Rect,
  props: {
    ...DEFAULT_RECT,
  },
};

const GROUP: ObjectType<typeof Group, GroupOptions> = {
  shape: "Group",
  component: Group,
  props: {
    ...DEFAULT_ANCHOR,
    visible: true,
    updateSort: false,
  },
};

const ANCHOR: ObjectType<typeof Anchor, AnchorOptions> = {
  shape: "Anchor",
  component: Anchor,
  props: {
    ...DEFAULT_ANCHOR,
  },
};

const ELLIPSE: ObjectType<typeof Ellipse, EllipseOptions> = {
  shape: "Ellipse",
  component: Ellipse,
  props: { ...DEFAULT_ELLIPSE },
};

const POLYGON: ObjectType<typeof Polygon, PolygonOptions> = {
  shape: "Polygon",
  component: Polygon,
  props: {
    ...DEFAULT_SHAPE,
    radius: 64,
    sides: 6,
  },
};

const CYLINDER: ObjectType<typeof Cylinder, CylinderOptions> = {
  shape: "Cylinder",
  component: Cylinder,
  props: {
    ...DEFAULT_SHAPE,
    diameter: 64,
    length: 64,
    frontFace: true,
  },
};

const HEMISPHERE: ObjectType<typeof Hemisphere, HemisphereOptions> = {
  shape: "Hemisphere",
  component: Hemisphere,
  props: {
    ...DEFAULT_ELLIPSE,
  },
};

const ROUNDED_RECT: ObjectType<typeof RoundedRect, RoundedRectOptions> = {
  shape: "Rounded Rectangle",
  component: RoundedRect,
  props: {
    ...DEFAULT_SHAPE,
    width: 64,
    height: 64,
    cornerRadius: 16,
  },
};

const Objects = [
  SHAPE,
  BOX,
  CONE,
  CYLINDER,
  HEMISPHERE,
  RECT,
  ROUNDED_RECT,
  ELLIPSE,
  POLYGON,
  ANCHOR,
  GROUP,
];

export default Objects;
