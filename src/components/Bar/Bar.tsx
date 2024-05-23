import { BiSolidCameraMovie } from "react-icons/bi";
import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";
import Menu from "@/components/Menu/Menu";
import MenuItem from "@/components/MenuItem/MenuItem";
import useScene from "@/components/Scene/useScene";
import Splitter from "@/components/Splitter/Splitter";
import Entities from "@/constants/Entities";
import Shapes from "@/constants/Shapes";
import tooltip from "@/utils/tooltip";
import styles from "./Bar.module.css";

const Bar = () => {
  const { add } = useScene();

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <Logo />
        <Splitter />
        {Entities.map((entity) => {
          const Icon = Shapes[entity.shape];
          return (
            <Button
              key={entity.shape}
              onClick={() => add(entity)}
              {...tooltip(entity.shape)}
            >
              <Icon />
            </Button>
          );
        })}
        <Splitter />
        <Menu
          buttonContent={<BiSolidCameraMovie />}
          {...tooltip("Camera Settings")}
        >
          <MenuItem>Reset Camera</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Bar;
