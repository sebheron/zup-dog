import { AnchorOptions } from "zdog";
import NameType from "./NameType";
import MustDeclare from "./utility/MustDeclare";

type ObjectType<O extends object = Record<string, unknown> & AnchorOptions> = {
  shape: NameType;
  props: MustDeclare<O>;
};

export default ObjectType;
