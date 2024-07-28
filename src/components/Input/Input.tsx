import { useRef } from "react";
import ColorPicker from "@/components/ColorPicker/ColorPicker";
import Switch from "@/components/Switch/Switch";
import useEdit from "@/hooks/useEdit";
import Vector3Type from "@/types/Vector3Type";
import titleCase from "@/utils/title";
import types from "@/utils/types";
import styles from "./Input.module.css";

interface InputDraggerProps {
  value: number;
  modifier?: number;
  onChange: (value: number) => void;
}

interface InputProps<T> {
  property: string;
  value: T;
  onChange: (value: T) => void;
}

const InputDragger = ({ value, modifier = 1, onChange }: InputDraggerProps) => {
  const startValueRef = useRef<number>(value);
  const startXRef = useRef<number>(0);

  const handleMouseMove = (e: MouseEvent) => {
    const diff = e.clientX - startXRef.current;
    onChange(Math.round((startValueRef.current + diff / modifier) * 1000) / 1000);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={styles.dragger}
      draggable
      onDragStart={(e) => {
        startXRef.current = e.clientX;
        startValueRef.current = value;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }}
    />
  );
};

const MultilineInput = ({ property, value, onChange }: InputProps<string>) => {
  const [text, setText] = useEdit(value, onChange);

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {titleCase(property)}
      </label>
      <textarea
        autoComplete="off"
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

const BooleanInput = ({ property, value, onChange }: InputProps<boolean>) => {
  return (
    <div className={styles.container} role="switch" aria-checked={value}>
      <label className={styles.label}>
        {titleCase(property)}
      </label>
      <Switch onChange={onChange} checked={value} />
    </div>
  );
};

const ColorInput = ({ property, value, onChange }: InputProps<string>) => {

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {titleCase(property)}
      </label>
      <ColorPicker color={value} onChange={onChange}>
        <div className={styles.box} style={{ backgroundColor: value }} />
      </ColorPicker>
    </div>
  );
};

const NumericalInput = ({ property, value, onChange }: InputProps<number>) => {
  const [number, setNumber] = useEdit<number>(value, onChange);

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {titleCase(property)}
      </label>
      <div className={styles.input}>
        <input
          autoComplete="off"
          className={styles.textbox}
          type="number"
          value={number}
          onChange={(e) => setNumber(parseFloat(e.target.value))}
        />
        <InputDragger value={number} onChange={setNumber} modifier={10} />
      </div>
    </div>
  );
};

const VectorInput = ({
  property,
  value,
  onChange,
}: InputProps<Vector3Type>) => {
  const [vector, setVector] = useEdit(value, onChange);

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {titleCase(property)}
      </label>
      <div className={styles.rightSide}>
        <div className={styles.input} data-label="X">
          <input
            autoComplete="off"
            className={styles.textbox}
            type="number"
            value={vector.x}
            onChange={(e) =>
              setVector((prev) => ({ ...prev, x: parseFloat(e.target.value) }))
            }
          />
          <InputDragger
            value={vector.x}
            onChange={(x) => setVector((prev) => ({ ...prev, x }))}
          />
        </div>
        <div className={styles.input} data-label="Y">
          <input
            autoComplete="off"
            className={styles.textbox}
            type="number"
            value={vector.y}
            onChange={(e) =>
              setVector((prev) => ({ ...prev, y: parseFloat(e.target.value) }))
            }
          />
          <InputDragger
            value={vector.y}
            onChange={(y) => setVector((prev) => ({ ...prev, y }))}
          />
        </div>
        <div className={styles.input} data-label="Z">
          <input
            autoComplete="off"
            className={styles.textbox}
            type="number"
            value={vector.z}
            onChange={(e) =>
              setVector((prev) => ({ ...prev, z: parseFloat(e.target.value) }))
            }
          />
          <InputDragger
            value={vector.z}
            onChange={(z) => setVector((prev) => ({ ...prev, z }))}
          />
        </div>
      </div>
    </div>
  );
};

const Input = <T,>({ property, value, onChange }: InputProps<T>) => {
  if (types.isVector(value)) {
    return (
      <VectorInput
        property={property}
        value={value}
        onChange={onChange as (value: Vector3Type) => void}
      />
    );
  }
  if (types.isNumber(value)) {
    return (
      <NumericalInput
        property={property}
        value={value}
        onChange={onChange as (value: number) => void}
      />
    );
  }
  if (types.isColor(value)) {
    return (
      <ColorInput
        property={property}
        value={value}
        onChange={onChange as (value: string) => void}
      />
    );
  }
  if (types.isBoolean(value)) {
    return (
      <BooleanInput
        property={property}
        value={value}
        onChange={onChange as (value: boolean) => void}
      />
    );
  }
  if (types.isText(value) && property === "value") {
    return (
      <MultilineInput
        property={property}
        value={value}
        onChange={onChange as (value: string) => void}
      />
    );
  }
};

Input.Boolean = BooleanInput;
Input.Color = ColorInput;
Input.Numerical = NumericalInput;
Input.Vector = VectorInput;

export default Input;
