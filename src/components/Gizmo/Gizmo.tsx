import Dolly from "../Dolly/Dolly";
import styles from "./Gizmo.module.css";
import { Illustration, Shape } from "react-zdog";

const GIZMO_COLORS = {
  CENTER: "#7c59ae",
  X: "#f00",
  Y: "#0f0",
  Z: "#4c41c8",
  DEFAULT: "#505050",
};

const Gizmo = () => (
  <div className={styles.gizmo}>
    <Illustration>
      <Dolly rotate />
      <Shape stroke={10} color={GIZMO_COLORS.CENTER} />
      <Shape stroke={10} color={GIZMO_COLORS.X} translate={{ x: 30 }} />
      <Shape stroke={10} color={GIZMO_COLORS.DEFAULT} translate={{ x: -30 }} />
      <Shape stroke={10} color={GIZMO_COLORS.Y} translate={{ y: -30 }} />
      <Shape stroke={10} color={GIZMO_COLORS.DEFAULT} translate={{ y: 30 }} />
      <Shape stroke={10} color={GIZMO_COLORS.Z} translate={{ z: 30 }} />
      <Shape stroke={10} color={GIZMO_COLORS.DEFAULT} translate={{ z: -30 }} />
      <Shape stroke={2} color={GIZMO_COLORS.X} path={[{}, { x: 30 }]} />
      <Shape stroke={2} color={GIZMO_COLORS.Y} path={[{}, { y: -30 }]} />
      <Shape stroke={2} color={GIZMO_COLORS.Z} path={[{}, { z: 30 }]} />
    </Illustration>
  </div>
);

export default Gizmo;
