import Vector3Type from "@/types/Vector3Type";

const isVector = (value: unknown): value is Vector3Type => {
  return (
    typeof value === "object" &&
    value !== null &&
    "x" in value &&
    "y" in value &&
    "z" in value
  );
};

const types = {
  isVector,
};

export default types;
