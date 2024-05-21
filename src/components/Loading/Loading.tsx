import Logo from "@/components/Logo/Logo";
import styles from "./Loading.module.css";

const Loading = () => (
  <div className={styles.loading}>
    <Logo size="large" />
    <div className={styles.container}>
      <div className={styles.bar}></div>
    </div>
  </div>
);

export default Loading;
