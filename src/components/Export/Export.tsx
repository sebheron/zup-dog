import { Dialog } from "@headlessui/react";
import { useCallback } from "react";
import { CopyBlock, codepen } from "react-code-blocks";
import useScene from "../Scene/useScene";
import styles from "./Export.module.css";

interface ExportProps {
  open: boolean;
  onClose: () => void;
}

const Export = ({ open, onClose }: ExportProps) => {
  const { objects } = useScene();

  const appendZdogObject = useCallback(
    (obj: Record<string, unknown>, parent?: string): string => {
      const prefix =
        Array.isArray(obj.children) && obj.children.length
          ? `const ${obj.id} = `
          : "";
      const props = { ...(obj.props as Record<string, unknown>) };
      if (parent) {
        props.addTo = parent;
      }
      const declaration = `${prefix}new Zdog.${obj.shape}(${JSON.stringify(props, null, 2)});\n`;
      if (Array.isArray(obj.children)) {
        return `${declaration}${obj.children.map((child) => appendZdogObject(child, obj.id as string)).join("")}`;
      }
      return `${declaration}\n`;
    },
    [],
  );

  const getJSText = useCallback(() => {
    const lines: string[] = objects.map((obj) => appendZdogObject(obj));
    return ['import Zdog from "zdog";', "", ...lines].join("\n");
  }, [objects]);

  return (
    <Dialog className={styles.container} open={open} onClose={onClose}>
      <Dialog.Panel className={styles.export}>
        <CopyBlock
          wrapLongLines
          language="javascript"
          theme={codepen}
          text={getJSText()}
          codeBlock
          customStyle={{ height: "100%", width: "100%", overflow: "auto" }}
        />
      </Dialog.Panel>
    </Dialog>
  );
};

export default Export;
