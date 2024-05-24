import { TAU } from "zdog";
import Colors from "./Colors";

const Translations = {
  XT: {
    color: Colors.XAXIS,
    direction: { x: 1, y: 0, z: 0 },
    rotation: { y: -TAU / 4 },
  },
  YT: {
    color: Colors.YAXIS,
    direction: { x: 0, y: -1, z: 0 },
    rotation: { x: TAU / 4 },
  },
  ZT: {
    color: Colors.ZAXIS,
    direction: { x: 0, y: 0, z: 1 },
    rotation: {},
  },
};

export type TranslationType = keyof typeof Translations;

export default Translations;
