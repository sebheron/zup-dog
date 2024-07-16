import { nanoid } from "nanoid";
import { PropsWithChildren, useRef, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import styles from "./Accordion.module.css";

const Accordion = ({ children }: PropsWithChildren) => {
  return <section className={styles.accordion}>{children}</section>;
};

interface Props extends PropsWithChildren {
  title: string;
  defaultChecked?: boolean;
}

const Entry = ({ children, title, defaultChecked = false }: Props) => {
  const id = useRef(nanoid());
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <article className={styles.entry}>
      <input
        type="checkbox"
        id={id.current}
        className={styles.checkbox}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor={id.current} className={styles.label}>
        <span>{title}</span>
        <MdChevronRight className={styles.icon} />
      </label>
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </article>
  );
};

Accordion.Entry = Entry;

export default Accordion;
