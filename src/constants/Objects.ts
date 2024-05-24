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
import NameType from "@/types/NameType";
import ObjectType from "@/types/ObjectType";
import MustDeclare from "@/types/utility/MustDeclare";

const defaultAnchor: MustDeclare<AnchorOptions> = {
  addTo: null,
  translate: { x: 0, y: 0, z: 0 },
  rotate: { x: 0, y: 0, z: 0 },
  scale: 1,
};

const defaultShape: MustDeclare<ShapeOptions> = {
  ...defaultAnchor,
  color: "#E62",
  stroke: 0,
  fill: true,
  closed: false,
  visible: true,
  backface: true,
  front: { x: 0, y: 0, z: 1 },
  path: [{ x: 0, y: 0, z: 0 }],
};

const defaultRect: MustDeclare<RectOptions> = {
  ...defaultShape,
  width: 64,
  height: 64,
};

const defaultEllipse: MustDeclare<EllipseOptions> = {
  ...defaultShape,
  diameter: 64,
  width: 64,
  height: 64,
  quarters: 4,
};

const ShapeObject: ObjectType<ShapeOptions> = {
  shape: NameType.Shape,
  props: {
    ...defaultShape,
    stroke: 64,
  },
};

const BoxObject: ObjectType<BoxOptions> = {
  shape: NameType.Box,
  props: {
    ...defaultRect,
    depth: 64,
    frontFace: true,
    rearFace: true,
    leftFace: true,
    rightFace: true,
    topFace: true,
    bottomFace: true,
  },
};

const ConeObject: ObjectType<ConeOptions> = {
  shape: NameType.Cone,
  props: {
    ...defaultEllipse,
    length: 64,
  },
};

const RectangleObject: ObjectType<RectOptions> = {
  shape: NameType.Rectangle,
  props: {
    ...defaultRect,
  },
};

const GroupObject: ObjectType<GroupOptions> = {
  shape: NameType.Group,
  props: {
    ...defaultAnchor,
    visible: true,
    updateSort: false,
  },
};

const AnchorObject: ObjectType<AnchorOptions> = {
  shape: NameType.Anchor,
  props: {
    ...defaultAnchor,
  },
};

const EllipseObject: ObjectType<EllipseOptions> = {
  shape: NameType.Ellipse,
  props: { ...defaultEllipse },
};

const PolygonObject: ObjectType<PolygonOptions> = {
  shape: NameType.Polygon,
  props: {
    ...defaultShape,
    radius: 64,
    sides: 6,
  },
};

const CylinderObject: ObjectType<CylinderOptions> = {
  shape: NameType.Cylinder,
  props: {
    ...defaultShape,
    diameter: 64,
    length: 64,
    frontFace: true,
  },
};

const HemisphereObject: ObjectType<HemisphereOptions> = {
  shape: NameType.Hemisphere,
  props: {
    ...defaultEllipse,
  },
};

const RoundedRectangleObject: ObjectType<RoundedRectOptions> = {
  shape: NameType.RoundedRectangle,
  props: {
    ...defaultShape,
    width: 64,
    height: 64,
    cornerRadius: 16,
  },
};

const Objects = [
  ShapeObject,
  BoxObject,
  ConeObject,
  CylinderObject,
  HemisphereObject,
  RectangleObject,
  RoundedRectangleObject,
  EllipseObject,
  PolygonObject,
  AnchorObject,
  GroupObject,
];

export default Objects;
