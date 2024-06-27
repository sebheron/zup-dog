import { BiSolidCameraMovie } from "react-icons/bi";
import { PiPaintBrushFill } from "react-icons/pi";
import { TbCube3dSphere } from "react-icons/tb";
import Button from "@/components/Button/Button";
import useCamera from "@/components/Camera/useCamera";
import Divider from "@/components/Divider/Divider";
import Logo from "@/components/Logo/Logo";
import Menu from "@/components/Menu/Menu";
import useScene from "@/components/Scene/useScene";
import Icons from "@/constants/Icons";
import Objects from "@/constants/Objects";
import ToolType from "@/types/ToolType";
import tooltip from "@/utils/tooltip";
import ColorPicker from "../ColorPicker/ColorPicker";
import styles from "./Bar.module.css";

const Bar = () => {
  const { tool, paintColor, selected, add, setPaintColor, setTool } =
    useScene();
  const { reset } = useCamera();

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <Logo />
        <Divider />
        <Button
          {...tooltip("Select")}
          active={tool === ToolType.Select}
          onClick={() => setTool(ToolType.Select)}
        >
          <TbCube3dSphere />
        </Button>
        <ColorPicker
          {...tooltip("Paint")}
          color={paintColor}
          onChange={setPaintColor}
          active={tool === ToolType.Paint}
          onSelect={() => setTool(ToolType.Paint)}
        >
          <PiPaintBrushFill />
        </ColorPicker>
        <Divider />
        {Objects.map((obj) => {
          const Icon = Icons[obj.shape];
          return (
            <Button
              key={obj.shape}
              onClick={() => add(obj, selected)}
              {...tooltip(obj.shape)}
            >
              <Icon />
            </Button>
          );
        })}
        <Divider />
        <Menu
          buttonContent={<BiSolidCameraMovie />}
          {...tooltip("Camera Settings")}
        >
          <Menu.Item onClick={reset}>Reset Camera</Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Bar;
