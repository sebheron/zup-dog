import { AnchorOptions } from "zdog";
import NameType from "./NameType";

type ObjectType<O extends object = Record<string, unknown> & AnchorOptions> = {
  shape: NameType;
  props: O;
};

export default ObjectType;
