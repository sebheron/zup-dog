import { Popover } from "@headlessui/react";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import Button from "../Button/Button";
import styles from "./ColorPicker.module.css";

interface Props extends PropsWithChildren {
  active?: boolean;
  color: string;
  onSelect?: () => void;
  onChange: (color: string) => void;
}

const ColorPicker = ({
  children,
  active,
  color,
  onSelect,
  onChange,
}: Props) => {
  const [localColor, setLocalColor] = useState(color);

  const handleMouseUp = useCallback(() => {
    if (localColor !== color) onChange(localColor);
  }, [localColor, color, onChange]);

  useEffect(() => {
    setLocalColor(color);
  }, [color]);

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            as={Button}
            size="small"
            active={open || active}
            onClick={onSelect}
          >
            {children}
          </Popover.Button>
          <Popover.Panel className={styles.top}>
            <div className={styles.container}>
              <HexAlphaColorPicker
                color={color}
                onChange={(color) => setLocalColor(color)}
                onMouseUp={handleMouseUp}
              />
              <div className={styles.block}>
                <HexColorInput
                  className={styles.input}
                  color={color}
                  onChange={(color) => setLocalColor(color)}
                  onBlur={handleMouseUp}
                  alpha
                />
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default ColorPicker;
