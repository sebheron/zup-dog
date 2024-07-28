import clsx from "clsx";
import {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Illustration, useZdog } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import Grid from "@/components/Grid/Grid";
import Model from "@/components/Model/Model";
import useScene from "@/components/Scene/useScene";
import SelectedModel from "@/components/SelectedModel/SelectedModel";
import useDolly from "@/hooks/useDolly";
import InstanceType from "@/types/InstanceType";
import ToolType from "@/types/ToolType";
import styles from "./Viewport.module.css";

const ViewportElement = forwardRef<HTMLCanvasElement | SVGSVGElement>(
  (_, ref) => {
    const { illu } = useZdog();
    const element = useRef(illu.element);

    useEffect(() => {
      if (!ref) return;
      if (typeof ref === "function") ref(element.current);
      else ref.current = element.current;
    }, [ref]);

    return null;
  },
);

const Viewport = ({ children }: PropsWithChildren) => {
  const { registerDolly } = useDolly();
  const { zoom, rotation, position } = useCamera();
  const { tool, objects, selected, select, del } = useScene();
  const mainViewport = useRef<HTMLCanvasElement | SVGSVGElement>(null);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (e.buttons !== 1 && !selected) return;
      select(null);
    },
    [select, selected],
  );

  const handleSelectedCanvasMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (e.buttons !== 1) return;
      if (mainViewport.current && "click" in mainViewport.current) {
        const event = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
          screenX: e.screenX,
          screenY: e.screenY,
        });
        mainViewport.current.dispatchEvent(event);
      }
      // select(null);
    },
    [select],
  );

  const handleModelClick = useCallback(
    (instance: InstanceType) => {
      select(instance);
    },
    [select],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selected) del([selected]);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [del, selected]);

  return (
    <div className={styles.container}>
      <div className={styles.viewport}>
        <Illustration
          element="canvas"
          onClick={handleCanvasClick}
          zoom={zoom}
          rotate={rotation}
          translate={position}
          pointerEvents
          {...registerDolly()}
        >
          <ViewportElement ref={mainViewport} />
          <Grid length={1000} cellSize={100} />
          {objects.map((obj) => (
            <Model key={obj.id} object={obj} onClick={handleModelClick} />
          ))}
        </Illustration>
      </div>
      {!!selected && tool === ToolType.Select && (
        <div className={clsx(styles.viewport, styles.filtered)}>
          <Illustration
            element="canvas"
            onPointerDown={handleSelectedCanvasMouseDown}
            zoom={zoom}
            rotate={rotation}
            translate={position}
            pointerEvents
            {...registerDolly()}
          >
            <SelectedModel objects={objects} />
          </Illustration>
        </div>
      )}
      {children}
    </div>
  );
};

export default Viewport;
