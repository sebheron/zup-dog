import { Fragment, useCallback, useState } from "react";
import { Cone, Shape } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import Arrows, { Arrow } from "@/constants/Arrows";
import Colors from "@/constants/Colors";
import ObjectInstance from "@/types/ObjectInstance";
import drag from "@/utils/cam";
import vector from "@/utils/vector";

interface Props {
  obj: ObjectInstance;
  selectedArrow: Arrow | null;
  onSelectArrow: (arrow: Arrow | null) => void;
}

const TransformGizmo = ({ obj, selectedArrow, onSelectArrow }: Props) => {
  const { zoom, rotation } = useCamera();

  const [interactable, setInteractable] = useState<Arrow | null>(null);

  const handleArrowDown = useCallback(
    (e: React.MouseEvent<HTMLElement>, arrow: Arrow) => {
      onSelectArrow(arrow);
      e.stopPropagation();
    },
    [onSelectArrow],
  );

  return (
    <>
      <Shape translate={obj.props.translate ?? undefined} scale={1 / zoom}>
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
                onPointerMove={() => setInteractable(key)}
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
      {!!selectedArrow && (
        <Shape
          stroke={10}
          color="#fff"
          translate={drag(rotation, zoom, 100, 100)}
        />
      )}
    </>
  );
};

export default TransformGizmo;
