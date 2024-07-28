import { Popover } from "@headlessui/react";
import clsx from "clsx";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import Button from "@/components/Button/Button";
import styles from "./ColorPicker.module.css";

interface Props
  extends PropsWithChildren,
    Omit<React.HTMLAttributes<HTMLButtonElement>, "className" | "onChange"> {
  color: string;
  active?: boolean;
  inline?: boolean;
  onSelect?: () => void;
  onChange: (color: string) => void;
}

const ColorPicker = ({
  children,
  color,
  active,
  inline,
  onSelect,
  onChange,
  ...props
}: Props) => {
  const [localColor, setLocalColor] = useState(color);

  const handleMouseUp = useCallback(() => {
    if (localColor !== color) onChange(localColor);
  }, [localColor, color, onChange]);

  useEffect(() => {
    setLocalColor(color);
  }, [color]);

  return (
    <div className={styles.container}>
      <Popover className={styles.picker}>
        {({ open }) => (
          <>
            <Popover.Button
              as={Button}
              size="small"
              active={open || active}
              onClick={onSelect}
              {...props}
            >
              {children}
            </Popover.Button>
            <Popover.Panel className={styles.top}>
              <div className={styles.popup}>
                <HexAlphaColorPicker
                  color={color}
                  onChange={(color) => setLocalColor(color)}
                  onMouseUp={handleMouseUp}
                />
                {!inline && (
                  <div className={styles.block}>
                    <HexColorInput
                      className={styles.input}
                      color={color}
                      onChange={(color) => setLocalColor(color)}
                      onBlur={handleMouseUp}
                      alpha
                    />
                  </div>
                )}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      {inline && (
        <HexColorInput
          className={clsx(styles.input, styles.inline)}
          color={color}
          onChange={(color) => setLocalColor(color)}
          onBlur={handleMouseUp}
          alpha
        />
      )}
    </div>
  );
};

export default ColorPicker;
