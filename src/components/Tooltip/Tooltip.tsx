import { Tooltip as ReactTooltip } from "react-tooltip";
import Global from "@/constants/Global";
import styles from "./Tooltip.module.css";

const Tooltip = () => (
  <ReactTooltip
    id={Global.TooltipId}
    className={styles.tooltip}
    disableStyleInjection={true}
    delayShow={800}
  />
);

export default Tooltip;
