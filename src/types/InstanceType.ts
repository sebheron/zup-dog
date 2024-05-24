import { AnchorOptions } from "zdog";
import ObjectType from "./ObjectType";

type InstanceType<O extends object = Record<string, unknown> & AnchorOptions> =
  ObjectType<O> & {
    id: string;
    name: string;
    children?: InstanceType[];
  };

export default InstanceType;
