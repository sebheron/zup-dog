import { Fragment, useCallback, useState } from "react";
import { Cone, Shape } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import Colors from "@/constants/Colors";
import Rotations, { RotationType } from "@/constants/Rotations";
import VectorType from "@/types/VectorType";
import vector from "@/utils/vector";

interface Props {
  position: VectorType;
  selectedRotation: RotationType | null;
  onBeginRotation: (arrow: RotationType) => void;
}

const RotationGizmo = ({
  position,
  selectedRotation,
  onBeginRotation: onSelectArrow,
}: Props) => {
  const { zoom } = useCamera();

  const [interactable, setInteractable] = useState<RotationType | null>(null);

  const handleRotationDown = useCallback(
    (e: React.MouseEvent<HTMLElement>, rotation: RotationType) => {
      onSelectArrow(rotation);
      e.stopPropagation();
    },
    [onSelectArrow],
  );

  return (
    <Shape translate={position} scale={1 / zoom}>
      {Object.entries(Rotations).map(([key, rotation]) => {
        const color =
          selectedRotation === key ||
          (!selectedRotation && interactable === key)
            ? Colors.HOVER
            : rotation.color;
        return (
          <Fragment key={key}>
            <Shape
              stroke={4 * (1 / zoom)}
              color={color}
              path={[
                vector.scale(rotation.start, 45),
                {
                  arc: [
                    vector.scale(rotation.arc, 45),
                    vector.scale(rotation.end, 45),
                  ],
                },
              ]}
              closed={false}
            />
            <Shape
              onPointerEnter={() => setInteractable(key as RotationType)}
              onPointerLeave={() => setInteractable(null)}
              onPointerDown={(e) => handleRotationDown(e, key as RotationType)}
              stroke={12 * (1 / zoom)}
              path={[
                vector.scale(rotation.start, 40),
                {
                  arc: [
                    vector.scale(rotation.arc, 40),
                    vector.scale(rotation.end, 40),
                  ],
                },
              ]}
              visible={false}
              pointerEvents
            />
          </Fragment>
        );
      })}
    </Shape>
  );
};

export default RotationGizmo;
