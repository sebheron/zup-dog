import { Fragment, useState } from "react";
import { Illustration, Shape } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import Axes, { AxisType } from "@/constants/Axes";
import styles from "./Axis.module.css";

const Axis = () => {
  const { lerpTo, rotation } = useCamera();
  const [interactable, setInteractable] = useState<AxisType | null>(null);

  return (
    <div className={styles.gizmo}>
      <Illustration
        className={styles.illo}
        element="canvas"
        rotate={rotation}
        pointerEvents
      >
        {Object.entries(Axes).map(([key, cap]) => (
          <Fragment key={key}>
            <Shape
              stroke={2}
              color={cap.color}
              path={[{}, cap.offset!]}
              pointerEvents={false}
            />
            <Shape
              stroke={interactable === key ? 14 : 10}
              color={cap.color}
              translate={cap.offset}
              pointerEvents={false}
            />
            <Shape
              stroke={20}
              translate={cap.offset}
              onPointerMove={() => setInteractable(key as AxisType)}
              onPointerLeave={() => setInteractable(null)}
              onClick={() =>
                lerpTo(cap.targetPosition!, cap.targetRotation!, 1000)
              }
              visible={false}
              pointerEvents
            />
          </Fragment>
        ))}
      </Illustration>
    </div>
  );
};

export default Axis;
