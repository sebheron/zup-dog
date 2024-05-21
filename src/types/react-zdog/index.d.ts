declare module "react-zdog" {
  import { DependencyList, PropsWithChildren } from "react";
  import {
    IllustrationOptions,
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
    Illustration as ZIllustration,
  } from "zdog";

  type AdditionalIllustrationProps = PropsWithChildren<{
    pointerEvents?: boolean;
    className?: string;
  }>;

  type AdditionalElementProps = PropsWithChildren<{
    onClick?: () => void;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
  }>;

  export const Illustration: React.FC<
    AdditionalIllustrationProps & IllustrationOptions
  >;
  export const Anchor: React.FC<AdditionalElementProps & AnchorOptions>;
  export const Shape: React.FC<AdditionalElementProps & ShapeOptions>;
  export const Group: React.FC<AdditionalElementProps & GroupOptions>;
  export const Rect: React.FC<AdditionalElementProps & RectOptions>;
  export const RoundedRect: React.FC<
    AdditionalElementProps & RoundedRectOptions
  >;
  export const Ellipse: React.FC<AdditionalElementProps & EllipseOptions>;
  export const Polygon: React.FC<AdditionalElementProps & PolygonOptions>;
  export const Hemisphere: React.FC<AdditionalElementProps & HemisphereOptions>;
  export const Cylinder: React.FC<AdditionalElementProps & CylinderOptions>;
  export const Cone: React.FC<AdditionalElementProps & ConeOptions>;
  export const Box: React.FC<AdditionalElementProps & BoxOptions>;

  export const useRender: (fn: () => void, deps: DependencyList) => void;
  export const useZdog: () => { illu: ZIllustration };
}
