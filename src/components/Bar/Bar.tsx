import { BiSolidCameraMovie } from "react-icons/bi";
import { PiPaintBrushFill } from "react-icons/pi";
import { TbCube3dSphere } from "react-icons/tb";
import Button from "@/components/Button/Button";
import useCamera from "@/components/Camera/useCamera";
import Divider from "@/components/Divider/Divider";
import Logo from "@/components/Logo/Logo";
import Menu from "@/components/Menu/Menu";
import MenuItem from "@/components/MenuItem/MenuItem";
import useScene from "@/components/Scene/useScene";
import Icons from "@/constants/Icons";
import Objects from "@/constants/Objects";
import tooltip from "@/utils/tooltip";
import styles from "./Bar.module.css";

const Bar = () => {
  const { selected, add } = useScene();
  const { reset } = useCamera();

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <Logo />
        <Divider />
        <Button {...tooltip("Select")}>
          <TbCube3dSphere />
        </Button>
        <Button {...tooltip("Paint")}>
          <PiPaintBrushFill />
        </Button>
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
          <MenuItem onClick={reset}>Reset Camera</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Bar;
