import EntityType from "../types/EntityType";
import {
  BoxOptions,
  ConeOptions,
  RectOptions,
  GroupOptions,
  ShapeOptions,
  AnchorOptions,
  EllipseOptions,
  PolygonOptions,
  CylinderOptions,
  HemisphereOptions,
  RoundedRectOptions,
} from "zdog";
import {
  Box,
  Cone,
  Rect,
  Group,
  Shape,
  Anchor,
  Ellipse,
  Polygon,
  Cylinder,
  Hemisphere,
  RoundedRect,
} from "react-zdog";
import MustDeclare from "../types/MustDeclare";

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

const SHAPE: Omit<EntityType<typeof Shape, ShapeOptions>, "id"> = {
  name: "Shape",
  component: Shape,
  props: {
    ...DEFAULT_SHAPE,
  },
};

const BOX: Omit<EntityType<typeof Box, BoxOptions>, "id"> = {
  name: "Box",
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

const CONE: Omit<EntityType<typeof Cone, ConeOptions>, "id"> = {
  name: "Cone",
  component: Cone,
  props: {
    ...DEFAULT_ELLIPSE,
    length: 64,
  },
};

const RECT: Omit<EntityType<typeof Rect, RectOptions>, "id"> = {
  name: "Rect",
  component: Rect,
  props: {
    ...DEFAULT_RECT,
  },
};

const GROUP: Omit<EntityType<typeof Group, GroupOptions>, "id"> = {
  name: "Group",
  component: Group,
  props: {
    ...DEFAULT_ANCHOR,
    visible: true,
    updateSort: false,
  },
};

const ANCHOR: Omit<EntityType<typeof Anchor, AnchorOptions>, "id"> = {
  name: "Anchor",
  component: Anchor,
  props: {
    ...DEFAULT_ANCHOR,
  },
};

const ELLIPSE: Omit<EntityType<typeof Ellipse, EllipseOptions>, "id"> = {
  name: "Ellipse",
  component: Ellipse,
  props: { ...DEFAULT_ELLIPSE },
};

const POLYGON: Omit<EntityType<typeof Polygon, PolygonOptions>, "id"> = {
  name: "Polygon",
  component: Polygon,
  props: {
    ...DEFAULT_SHAPE,
    radius: 64,
    sides: 5,
  },
};

const CYLINDER: Omit<EntityType<typeof Cylinder, CylinderOptions>, "id"> = {
  name: "Cylinder",
  component: Cylinder,
  props: {
    ...DEFAULT_SHAPE,
    diameter: 64,
    length: 64,
    frontFace: true,
  },
};

const HEMISPHERE: Omit<
  EntityType<typeof Hemisphere, HemisphereOptions>,
  "id"
> = {
  name: "Hemisphere",
  component: Hemisphere,
  props: {
    ...DEFAULT_ELLIPSE,
  },
};

const ROUNDED_RECT: Omit<
  EntityType<typeof RoundedRect, RoundedRectOptions>,
  "id"
> = {
  name: "RoundedRect",
  component: RoundedRect,
  props: {
    ...DEFAULT_SHAPE,
    width: 64,
    height: 64,
    cornerRadius: 16,
  },
};

const Entities = {
  SHAPE,
  BOX,
  CONE,
  RECT,
  GROUP,
  ANCHOR,
  ELLIPSE,
  POLYGON,
  CYLINDER,
  HEMISPHERE,
  ROUNDED_RECT,
};

export default Entities;
