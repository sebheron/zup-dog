const Categories: Record<string, string[]> = {
  Transform: ["translate", "rotate", "scale", "front"],
  Style: [
    "visible",
    "color",
    "stroke",
    "fill",
    "closed",
    "quarters",
    "cornerRadius",
    "sides",
  ],
  Size: ["width", "height", "depth", "length", "diameter", "radius"],
  Show: [
    "backface",
    "frontFace",
    "rearFace",
    "topFace",
    "bottomFace",
    "leftFace",
    "rightFace",
    "updateSort",
  ],
};

export default Categories;
