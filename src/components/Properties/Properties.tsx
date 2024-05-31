import Input from "../Input/Input";
import useScene from "../Scene/useScene";
import styles from "./Properties.module.css";

const Properties = () => {
  const { selected, update } = useScene();

  return (
    <div className={styles.properties}>
      {!!selected &&
        Object.entries(selected.props).map(([key, value]) => (
          <Input
            key={key}
            property={key}
            value={value}
            onChange={(value) => update(selected, { [key]: value })}
          />
        ))}
    </div>
  );
};

export default Properties;
