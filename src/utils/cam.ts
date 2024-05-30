import { ElementProxy } from "react-zdog-alt";

const screenPosition = (el: ElementProxy) => {
  const padding =
    0.25 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const { x, y } = el.renderOrigin;
  return {
    x: x - padding + window.innerWidth / 2,
    y: y - padding + window.innerHeight / 2,
  };
};

const cam = {
  screenPosition,
};

export default cam;
