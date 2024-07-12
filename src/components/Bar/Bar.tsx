import { useState } from "react";
import { BiExport, BiImport, BiSave, BiSolidCameraMovie } from "react-icons/bi";
import { PiPaintBrushFill } from "react-icons/pi";
import { TbCube3dSphere } from "react-icons/tb";
import Button from "@/components/Button/Button";
import useCamera from "@/components/Camera/useCamera";
import ColorPicker from "@/components/ColorPicker/ColorPicker";
import Divider from "@/components/Divider/Divider";
import Export from "@/components/Export/Export";
import Logo from "@/components/Logo/Logo";
import Menu from "@/components/Menu/Menu";
import useScene from "@/components/Scene/useScene";
import Icons from "@/constants/Icons";
import Objects from "@/constants/Objects";
import ToolType from "@/types/ToolType";
import tooltip from "@/utils/tooltip";
import Load from "../Button/Load";
import styles from "./Bar.module.css";

const Bar = () => {
  const [exporting, setExporting] = useState(false);
  const {
    tool,
    paintColor,
    selected,
    objects,
    add,
    setPaintColor,
    setTool,
    setObjects,
  } = useScene();
  const { position, rotation, zoom, setPosition, setRotation, setZoom, reset } =
    useCamera();

  const saveToFile = () => {
    const link = document.createElement("a");
    link.download = "scene.json";
    link.href = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            {
              objects,
              camera: {
                position,
                rotation,
                zoom,
              },
            },
            null,
            2,
          ),
        ],
        {
          type: "application/json",
        },
      ),
    );
    link.click();
  };

  const loadFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const { objects, camera } = JSON.parse(e.target?.result as string);
        setObjects(objects);
        setPosition(camera.position);
        setRotation(camera.rotation);
        setZoom(camera.zoom);
      };
      reader.readAsText(file);
    }
  };

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
        <Load
          onChange={loadFromFile}
          {...tooltip("Load")}
          accept="application/json"
        >
          <BiImport />
        </Load>
        <Button onClick={() => saveToFile()} {...tooltip("Save")}>
          <BiSave />
        </Button>
        <Button onClick={() => setExporting(true)} {...tooltip("Export")}>
          <BiExport />
        </Button>
      </div>
      <Export
        open={exporting}
        onClose={() => setExporting(false)}
        {...tooltip("Export")}
      />
    </div>
  );
};

export default Bar;
