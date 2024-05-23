import { Fragment, useCallback, useState } from "react";
import { Cone, Shape } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import ARROWS, { Arrow } from "@/constants/Arrows";
import Colors from "@/constants/Colors";
import ObjectInstance from "@/types/ObjectInstance";

interface Props {
  obj: ObjectInstance;
}

const TransformGizmo = ({ obj }: Props) => {
  const { zoom } = useCamera();

  const [interactable, setInteractable] = useState<Arrow | null>(null);

  const handleConeDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <Shape translate={obj.props.translate ?? undefined} scale={1 / zoom}>
      {Object.entries(ARROWS).map(([key, arrow]) => (
        <Fragment key={key}>
          <Shape
            stroke={4 * (1 / zoom)}
            color={interactable === key ? Colors.HOVER : arrow.color}
            path={[{}, arrow.direction]}
          />
          <Cone
            translate={arrow.direction}
            rotate={arrow.rotation}
            diameter={10}
            length={20}
            color={interactable === key ? Colors.HOVER : arrow.color}
            backface={true}
          />
          <Shape
            onPointerMove={() => setInteractable(key)}
            onPointerLeave={() => setInteractable(null)}
            onPointerDown={handleConeDown}
            stroke={24 * (1 / zoom)}
            path={[{}, arrow.direction]}
            visible={false}
            pointerEvents
          />
          <Cone
            onPointerMove={() => setInteractable(key)}
            onPointerLeave={() => setInteractable(null)}
            onPointerDown={handleConeDown}
            translate={arrow.direction}
            rotate={arrow.rotation}
            diameter={24}
            length={35}
            backface={true}
            visible={false}
            pointerEvents
          />
        </Fragment>
      ))}
    </Shape>
  );
};

export default TransformGizmo;
