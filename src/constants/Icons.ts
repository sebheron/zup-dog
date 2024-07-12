import { IconType } from "react-icons";
import { BiCylinder } from "react-icons/bi";
import { CgShapeHexagon } from "react-icons/cg";
import { FaObjectGroup, FaRegCircle } from "react-icons/fa";
import { GiThreePointedShuriken } from "react-icons/gi";
import { HiOutlineCube } from "react-icons/hi2";
import { LuRectangleHorizontal } from "react-icons/lu";
import { MdOutlineRectangle } from "react-icons/md";
import { TbCone, TbHemisphere, TbShape } from "react-icons/tb";
import NameType from "@/types/NameType";

const Icons: Record<NameType, IconType> = {
  [NameType.Shape]: TbShape,
  [NameType.Box]: HiOutlineCube,
  [NameType.Cone]: TbCone,
  [NameType.Cylinder]: BiCylinder,
  [NameType.Hemisphere]: TbHemisphere,
  [NameType.Rectangle]: MdOutlineRectangle,
  [NameType.RoundedRectangle]: LuRectangleHorizontal,
  [NameType.Ellipse]: FaRegCircle,
  [NameType.Polygon]: CgShapeHexagon,
  [NameType.Anchor]: GiThreePointedShuriken,
  [NameType.Group]: FaObjectGroup,
  // [NameType.Text]: PiTextAa,
};

export default Icons;
