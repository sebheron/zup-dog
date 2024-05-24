import { PropsWithChildren, useCallback, useState } from "react";
import { Illustration } from "react-zdog-alt";
import { PointerPosition } from "zdog";
import useCamera from "@/components/Camera/useCamera";
import Grid from "@/components/Grid/Grid";
import Model from "@/components/Model/Model";
import useScene from "@/components/Scene/useScene";
import TransformGizmo from "@/components/TransformGizmo/TransformGizmo";
import { Arrow } from "@/constants/Arrows";
import useDolly from "@/hooks/useDolly";
import ObjectInstance from "@/types/ObjectInstance";
import styles from "./Viewport.module.css";

interface Props extends PropsWithChildren {
  objects: ObjectInstance[];
}

const Viewport = ({ children, objects }: Props) => {
  const { register } = useDolly();
  const { zoom, rotation, position } = useCamera();
  const { selected, select } = useScene();

  const [arrow, setArrow] = useState<Arrow | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (e.buttons !== 1) return;
      select(null);
    },
    [select],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (e.buttons === 1) return;
      setArrow(null);
    },
    [],
  );

  const handleDragMove = useCallback(
    (pointer: PointerPosition, moveX: number, moveY: number) => {
      //Move according to the arrow selected
      console.log(pointer, moveX, moveY);
      if (arrow) {
      }
    },
    [arrow],
  );

  return (
    <div className={styles.container}>
      <div className={styles.viewport}>
        <Illustration
          element="canvas"
          zoom={zoom}
          pointerEvents
          onDragMove={handleDragMove}
          translate={position}
          rotate={rotation}
          {...register()}
        >
          <Grid length={1000} cellSize={100} />
          <Model objects={objects} />
        </Illustration>
      </div>
      {!!selected && (
        <div className={styles.viewport}>
          <Illustration
            element="canvas"
            zoom={zoom}
            onPointerDown={handleMouseDown}
            onPointerMove={handleMouseMove}
            onPointerUp={() => setArrow(null)}
            translate={position}
            rotate={rotation}
            pointerEvents
            {...register()}
          >
            <TransformGizmo
              obj={selected}
              selectedArrow={arrow}
              onSelectArrow={(arrow) => setArrow(arrow)}
            />
          </Illustration>
        </div>
      )}
      {children}
    </div>
  );
};

export default Viewport;
