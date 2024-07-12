import { Dialog } from "@headlessui/react";
import { useCallback, useState } from "react";
import { CodeBlock, CopyBlock, codepen } from "react-code-blocks";
import stringifyObject from "stringify-object";
import useCamera from "@/components/Camera/useCamera";
import useScene from "@/components/Scene/useScene";
import ValueType from "@/types/ValueType";
import { ExportKey, Exports } from "@/utils/exports";
import styles from "./Export.module.css";

interface ExportProps {
  open: boolean;
  onClose: () => void;
}

const Export = ({ open, onClose }: ExportProps) => {
  const { objects } = useScene();
  const { position, rotation, zoom } = useCamera();

  const [mode, setMode] = useState<ExportKey>("canvas");

  const getIllo = useCallback(() => {
    const props = {
      element: "zcanvas",
      dragRotate: true,
      zoom,
      translate: position,
      rotate: rotation,
    };

    return `const illo = new Zdog.Illustration(${stringifyObject(props, {
      indent: "  ",
      singleQuotes: false,
      transform: transformZdogProps,
      filter: filterZdogProps,
    })});\n`;
  }, [position, rotation, zoom]);

  const filterZdogProps = useCallback(
    (
      props: Record<string | number | symbol, unknown>,
      prop: string | number | symbol,
    ) => {
      return props[prop] !== undefined;
    },
    [],
  );

  const transformZdogProps = useCallback(
    (props: object, prop: string | number | symbol, originalResult: string) => {
      if (prop === "addTo" || prop === "element") {
        return (props as Record<string | number | symbol, unknown>)[
          prop
        ] as string;
      }
      return originalResult;
    },
    [],
  );

  const getPrefix = useCallback(
    (obj: Record<string, unknown>, name: string) => {
      return Array.isArray(obj.children) && obj.children.length
        ? `const ${name} = `
        : "";
    },
    [],
  );

  const getProps = useCallback(
    (obj: Record<string, unknown>, parent?: string) => {
      const props = { ...(obj.props as Record<string, unknown>) };
      if (parent) {
        props.addTo = parent;
      }
      return props;
    },
    [],
  );

  const getDeclaration = useCallback(
    (
      obj: Record<string, unknown>,
      prefix: string,
      props: Record<string, unknown>,
    ) => {
      return `${prefix}new Zdog.${obj.shape}(${stringifyObject(props, {
        indent: "  ",
        singleQuotes: false,
        transform: transformZdogProps,
        filter: filterZdogProps,
      })});`;
    },
    [transformZdogProps, filterZdogProps],
  );

  const appendZdogObject = useCallback(
    (
      obj: Record<string, unknown>,
      index: ValueType<number>,
      parent: string,
    ): string => {
      const name = `zShape${index.value}`;
      index.value += 1;

      const prefix = getPrefix(obj, name);
      const props = getProps(obj, parent);
      const declaration = getDeclaration(obj, prefix, props);

      if (Array.isArray(obj.children)) {
        return `${declaration}${obj.children.map((child) => appendZdogObject(child, index, name)).join("")}`;
      }
      return `${declaration}\n`;
    },
    [getPrefix, getProps, getDeclaration],
  );

  const getJSText = useCallback(() => {
    let index: ValueType<number> = { value: 0 };
    const lines: string[] = objects.map((obj) =>
      appendZdogObject(obj, index, "illo"),
    );

    const { getHeader, getFooter } = Exports[mode];

    return [getHeader(), "", getIllo(), ...lines, getFooter()]
      .join("\n")
      .trim();
  }, [objects, appendZdogObject, getIllo, mode]);

  return (
    <Dialog className={styles.container} open={open} onClose={onClose}>
      <Dialog.Panel className={styles.export}>
        <CopyBlock
          language="javascript"
          text={getJSText()}
          theme={codepen}
          customStyle={{ flex: "1", width: "100%", overflow: "auto" }}
          wrapLongLines
          showLineNumbers
        />
      </Dialog.Panel>
    </Dialog>
  );
};

export default Export;
