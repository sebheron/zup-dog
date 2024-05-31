import Vector3Type from "@/types/Vector3Type";
import titleCase from "@/utils/title";
import types from "@/utils/types";
import styles from "./Input.module.css";

interface Props<T> {
  property: string;
  value: T;
  onChange: (value: T) => void;
}

// const NumericalInput = <T extends number>({
//   property,
//   value,
//   onChange,
// }: Props<T>) => {
//   return (
//     <div className={styles.container}>
//       <label className={styles.label}>{titleCase(property)}</label>
//       <input
//         className={styles.input}
//         type="number"
//         value={value}
//         onChange={(e) => onChange(parseFloat(e.target.value))}
//       />
//     </div>
//   );
// };

const VectorInput = <T extends Vector3Type>({
  property,
  value,
  onChange,
}: Props<T>) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{titleCase(property)}</label>
      <div className={styles.rightSide}>
        <div className={styles.input} data-label="X">
          <input
            className={styles.textbox}
            type="number"
            value={value.x}
            onChange={(e) =>
              onChange({ ...value, x: parseFloat(e.target.value) })
            }
          />
        </div>
        <div className={styles.input} data-label="Y">
          <input
            className={styles.textbox}
            type="number"
            value={value.y}
            onChange={(e) =>
              onChange({ ...value, y: parseFloat(e.target.value) })
            }
          />
        </div>
        <div className={styles.input} data-label="Z">
          <input
            className={styles.textbox}
            type="number"
            value={value.z}
            onChange={(e) =>
              onChange({ ...value, z: parseFloat(e.target.value) })
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
      <VectorInput property={property} value={value} onChange={onChange} />
    );
  }
};

export default Input;
