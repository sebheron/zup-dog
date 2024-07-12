import { MdDelete } from "react-icons/md";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import useScene from "@/components/Scene/useScene";
import styles from "./Properties.module.css";

const Properties = () => {
  const { selected, update, del } = useScene();

  return (
    <div className={styles.properties}>
      {!!selected && (
        <>
          <header className={styles.header}>
            <h2 className={styles.title}>{selected.name}</h2>
            <Button size="small" onClick={() => del([selected])}>
              <MdDelete />
            </Button>
          </header>
          {Object.entries(selected.props).map(([key, value]) => (
            <Input
              key={key}
              property={key}
              value={value}
              onChange={(value) => update(selected, { [key]: value })}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Properties;
