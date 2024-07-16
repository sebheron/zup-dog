import { MdDelete } from "react-icons/md";
import Accordion from "@/components/Accordion/Accordion";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import useScene from "@/components/Scene/useScene";
import Categories from "@/constants/Categories";
import styles from "./Properties.module.css";

const Properties = () => {
  const { selected, update, del } = useScene();

  return selected != null ? (
    <div className={styles.properties}>
      <header className={styles.header}>
        <h2 className={styles.title}>{selected.name}</h2>
        <Button size="small" onClick={() => del([selected])}>
          <MdDelete />
        </Button>
      </header>
      {/* {Object.entries(selected.props).map(([key, value]) => (
            <Input
              key={key}
              property={key}
              value={value}
              onChange={(value) => update(selected, { [key]: value })}
            />
          ))} */}
      <Accordion>
        {Object.entries(Categories).map(([category, properties], index) => (
          <Accordion.Entry
            key={category}
            title={category}
            defaultChecked={index === 0}
          >
            {properties.map((property) => (
              <Input
                key={property}
                property={property}
                value={selected.props[property]}
                onChange={(value) => update(selected, { [property]: value })}
              />
            ))}
          </Accordion.Entry>
        ))}
        {/* Capture missing properties */}
        {/* <Accordion.Entry title="Extra">
          {Object.entries(selected.props)
            .filter(([key]) => !Object.values(Categories).flat().includes(key))
            .map(([key, value]) => (
              <Input
                key={key}
                property={key}
                value={value}
                onChange={(value) => update(selected, { [key]: value })}
              />
            ))}
        </Accordion.Entry> */}
      </Accordion>
    </div>
  ) : null;
};

export default Properties;
