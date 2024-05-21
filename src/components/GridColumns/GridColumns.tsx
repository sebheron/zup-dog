import { PropsWithChildren } from "react";
import styles from "./GridColumns.module.css";

interface Props extends PropsWithChildren {
  columns: string;
}

const GridColumns = ({ children, columns }: Props) => {
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: columns }}>
      {children}
    </div>
  );
};

export default GridColumns;
