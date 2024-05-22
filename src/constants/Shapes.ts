import { BiCylinder } from "react-icons/bi";
import { CgShapeHexagon } from "react-icons/cg";
import { FaRegCircle } from "react-icons/fa";
import { FaObjectGroup } from "react-icons/fa6";
import { GiThreePointedShuriken } from "react-icons/gi";
import { HiOutlineCube } from "react-icons/hi2";
import { LuRectangleHorizontal } from "react-icons/lu";
import { MdOutlineRectangle } from "react-icons/md";
import { TbCone, TbHemisphere, TbShape } from "react-icons/tb";

const Shapes = {
  Shape: TbShape,
  Box: HiOutlineCube,
  Cone: TbCone,
  Cylinder: BiCylinder,
  Hemisphere: TbHemisphere,
  Rectangle: MdOutlineRectangle,
  "Rounded Rectangle": LuRectangleHorizontal,
  Ellipse: FaRegCircle,
  Polygon: CgShapeHexagon,
  Anchor: GiThreePointedShuriken,
  Group: FaObjectGroup,
};

export default Shapes;
