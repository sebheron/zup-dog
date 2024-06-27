import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx from "clsx";
import styles from "./Switch.module.css";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch = ({ checked, onChange }: Props) => (
  <HeadlessSwitch
    checked={checked}
    onChange={onChange}
    className={styles.switch}
  >
    <span className={clsx(styles.thumb, { [styles.checked]: checked })} />
  </HeadlessSwitch>
);

export default Switch;
