import { Fragment, useState } from "react";
import { Illustration, Shape } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import CAPS, { Cap } from "@/constants/Caps";
import styles from "./ScreenGizmo.module.css";

const Gizmo = () => {
  const { lerpTo, rotation } = useCamera();
  const [interactable, setInteractable] = useState<Cap | null>(null);

  return (
    <div className={styles.gizmo}>
      <Illustration
        className={styles.illo}
        element="canvas"
        rotate={rotation}
        pointerEvents
      >
        {Object.entries(CAPS).map(([key, cap]) => (
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
            {!!cap.targetRotation && !!cap.targetPosition && (
              <Shape
                stroke={20}
                translate={cap.offset}
                onPointerMove={() => setInteractable(key)}
                onPointerLeave={() => setInteractable(null)}
                onClick={() =>
                  lerpTo(cap.targetPosition!, cap.targetRotation!, 1000)
                }
                visible={false}
                pointerEvents
              />
            )}
          </Fragment>
        ))}
      </Illustration>
    </div>
  );
};

export default Gizmo;
