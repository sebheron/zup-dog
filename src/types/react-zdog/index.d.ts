declare module "react-zdog-alt" {
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
    VectorOptions,
  } from "zdog";
  import { TextOptions } from "zfont";

  export type ElementProxy = {
    renderOrigin: Required<VectorOptions>;
    isFacingBack: boolean;
  };

  export type AdditionalElementProps = PropsWithChildren<{
    pointerEvents?: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onPointerMove?: (e: React.MouseEvent<HTMLElement>) => void;
    onPointerDown?: (e: React.MouseEvent<HTMLElement>) => void;
    onPointerUp?: (e: React.MouseEvent<HTMLElement>) => void;
    onPointerEnter?: (e: React.MouseEvent<HTMLElement>) => void;
    onPointerLeave?: (e: React.MouseEvent<HTMLElement>) => void;
    ref?: React.Ref<ElementProxy>;
  }>;

  type AdditionalIllustrationProps = PropsWithChildren<{
    pointerEvents?: boolean;
    className?: string;
  }>;

  export const Illustration: React.FC<
    AdditionalIllustrationProps & AdditionalElementProps & IllustrationOptions
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
  export const Text: React.FC<AdditionalElementProps & TextOptions<string>>;

  export const useRender: (fn: () => void, deps: DependencyList) => void;
  export const useZdog: () => { illu: ZIllustration };
}
