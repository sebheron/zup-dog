import { Fragment, useCallback, useState } from "react";
import { Cone, Shape } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import Arrows, { Arrow } from "@/constants/Arrows";
import Colors from "@/constants/Colors";
import VectorType from "@/types/VectorType";
import vector from "@/utils/vector";

interface Props {
  position: VectorType;
  selectedArrow: Arrow | null;
  onSelectArrow: (arrow: Arrow) => void;
}

const TransformGizmo = ({ position, selectedArrow, onSelectArrow }: Props) => {
  const { zoom } = useCamera();

  const [interactable, setInteractable] = useState<Arrow | null>(null);

  const handleArrowDown = useCallback(
    (e: React.MouseEvent<HTMLElement>, arrow: Arrow) => {
      onSelectArrow(arrow);
      e.stopPropagation();
    },
    [onSelectArrow],
  );

  return (
    <Shape translate={position} scale={1 / zoom}>
      {Object.entries(Arrows).map(([key, arrow]) => {
        const color =
          selectedArrow === key || (!selectedArrow && interactable === key)
            ? Colors.HOVER
            : arrow.color;
        return (
          <Fragment key={key}>
            <Shape
              stroke={4 * (1 / zoom)}
              color={color}
              path={[{}, vector.scale(arrow.direction, 50)]}
            />
            <Cone
              translate={vector.scale(arrow.direction, 50)}
              rotate={arrow.rotation}
              diameter={10}
              length={20}
              color={color}
              backface={true}
            />
            <Shape
              onPointerEnter={() => setInteractable(key)}
              onPointerLeave={() => setInteractable(null)}
              onPointerDown={(e) => handleArrowDown(e, key)}
              stroke={30 * (1 / zoom)}
              path={[{}, vector.scale(arrow.direction, 70)]}
              visible={false}
              pointerEvents
            />
          </Fragment>
        );
      })}
    </Shape>
  );
};

export default TransformGizmo;
