import ColorPicker from "@/components/ColorPicker/ColorPicker";
import Switch from "@/components/Switch/Switch";
import useEdit from "@/hooks/useEdit";
import Vector3Type from "@/types/Vector3Type";
import titleCase from "@/utils/title";
import types from "@/utils/types";
import styles from "./Input.module.css";

interface Props<T> {
  property: string;
  value: T;
  onChange: (value: T) => void;
}

const MultilineInput = ({ property, value, onChange }: Props<string>) => {
  const [text, setText] = useEdit(value, onChange);

  return (
    <div className={styles.container}>
      <label className={styles.label}>{titleCase(property)}</label>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

const BooleanInput = ({ property, value, onChange }: Props<boolean>) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{titleCase(property)}</label>
      <Switch onChange={onChange} checked={value} />
    </div>
  );
};

const ColorInput = ({ property, value, onChange }: Props<string>) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{titleCase(property)}</label>
      <ColorPicker color={value} onChange={onChange}>
        <div className={styles.box} style={{ backgroundColor: value }} />
      </ColorPicker>
    </div>
  );
};

const NumericalInput = ({ property, value, onChange }: Props<number>) => {
  const [number, setNumber] = useEdit<number>(value, onChange);

  return (
    <div className={styles.container}>
      <label className={styles.label}>{titleCase(property)}</label>
      <div className={styles.input}>
        <input
          className={styles.textbox}
          type="number"
          value={number}
          onChange={(e) => setNumber(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

const VectorInput = ({ property, value, onChange }: Props<Vector3Type>) => {
  const [vector, setVector] = useEdit(value, onChange);

  return (
    <div className={styles.container}>
      <label className={styles.label}>{titleCase(property)}</label>
      <div className={styles.rightSide}>
        <div className={styles.input} data-label="X">
          <input
            className={styles.textbox}
            type="number"
            value={vector.x}
            onChange={(e) =>
              setVector((prev) => ({ ...prev, x: parseFloat(e.target.value) }))
            }
          />
        </div>
        <div className={styles.input} data-label="Y">
          <input
            className={styles.textbox}
            type="number"
            value={vector.y}
            onChange={(e) =>
              setVector((prev) => ({ ...prev, y: parseFloat(e.target.value) }))
            }
          />
        </div>
        <div className={styles.input} data-label="Z">
          <input
            className={styles.textbox}
            type="number"
            value={vector.z}
            onChange={(e) =>
              setVector((prev) => ({ ...prev, z: parseFloat(e.target.value) }))
            }
          />
        </div>
      </div>
    </div>
  );
};

const Input = <T,>({ property, value, onChange }: Props<T>) => {
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
