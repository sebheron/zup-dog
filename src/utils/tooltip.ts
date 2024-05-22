import Global from "@/constants/Global";

const tooltip = (
  message: string,
  position: "top" | "bottom" | "left" | "right" = "bottom",
) => ({
  "data-tooltip-id": Global.TOOLTIP_ID,
  "data-tooltip-content": message,
  "data-tooltip-place": position,
});

export default tooltip;
