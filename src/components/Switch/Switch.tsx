import clsx from "clsx";
import styles from "./Switch.module.css";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch = ({ checked, onChange }: Props) => (
  <div className={styles.container}>
    <span className={clsx(styles.switch, !checked && styles.checked)} />
    <button
      className={clsx(styles.button, checked && styles.checked)}
      onClick={() => checked || onChange(true)}
    >
      Yes
    </button>
    <button
      className={clsx(styles.button, !checked && styles.checked)}
      onClick={() => !checked || onChange(false)}
    >
      No
    </button>
  </div>
);

export default Switch;
