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

const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

const isColor = (value: unknown): value is string => {
  return (
    typeof value === "string" &&
    new RegExp(/^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/i).test(
      value,
    )
  );
};

const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

const types = {
  isVector,
  isNumber,
  isColor,
  isBoolean,
};

export default types;
