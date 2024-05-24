import { FC, PropsWithChildren } from "react";
import {
  AdditionalElementProps,
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
import NameType from "@/types/NameType";

const Components: Record<
  NameType,
  FC<AdditionalElementProps & PropsWithChildren>
> = {
  [NameType.Shape]: Shape,
  [NameType.Box]: Box,
  [NameType.Cone]: Cone,
  [NameType.Cylinder]: Cylinder,
  [NameType.Hemisphere]: Hemisphere,
  [NameType.Rectangle]: Rect,
  [NameType.RoundedRectangle]: RoundedRect,
  [NameType.Ellipse]: Ellipse,
  [NameType.Polygon]: Polygon,
  [NameType.Anchor]: Anchor,
  [NameType.Group]: Group,
};

export default Components;
