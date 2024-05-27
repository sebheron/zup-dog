import { Fragment, useCallback, useState } from "react";
import { Shape } from "react-zdog-alt";
import { PathCommand, TAU } from "zdog";
import useCamera from "@/components/Camera/useCamera";
import GizmoProps from "@/components/Gizmos/GizmoProps";
import { RotationType, Rotations } from "@/constants/Actions";
import Colors from "@/constants/Colors";
import vector from "@/utils/vector";

const RotationGizmo = ({ position, action, onAction }: GizmoProps) => {
  const { zoom } = useCamera();

  const [interactable, setInteractable] = useState<RotationType | null>(null);

  const handleRotationDown = useCallback(
    (e: React.MouseEvent<HTMLElement>, rotation: RotationType) => {
      onAction(rotation);
      e.stopPropagation();
    },
    [onAction],
  );

  return (
    <Shape translate={position} scale={1 / zoom} color="transparent">
      {Object.entries(Rotations).map(([key, rotation]) => {
        const path: PathCommand[] = [
          vector.scale(rotation.start, 40),
          {
            arc: [
              vector.scale(rotation.arc, 40),
              vector.scale(rotation.end, 40),
            ],
          },
        ];
        const color =
          action === key || (!action && interactable === key)
            ? Colors.HOVER
            : rotation.color;
        const active = !action || action === key;
        return (
          <Fragment key={key}>
            <Shape
              stroke={4 * (1 / zoom)}
              color={color}
              path={path}
              closed={false}
              visible={active}
              pointerEvents={false}
            />
            <Shape
              onPointerEnter={() => setInteractable(key as RotationType)}
              onPointerLeave={() => setInteractable(null)}
              onPointerDown={(e) => handleRotationDown(e, key as RotationType)}
              stroke={12 * (1 / zoom)}
              path={path}
              visible={false}
              pointerEvents
            />
            {action === key && (
              <>
                <Shape
                  stroke={8 * (1 / zoom)}
                  color={Colors.HOVER}
                  pointerEvents={false}
                />
                <Shape
                  stroke={4 * (1 / zoom)}
                  color={Colors.HOVER}
                  path={path}
                  rotate={vector.scale(rotation.direction, TAU / 4)}
                  closed={false}
                  pointerEvents={false}
                />
                <Shape
                  stroke={4 * (1 / zoom)}
                  color={Colors.HOVER}
                  path={path}
                  rotate={vector.scale(rotation.direction, TAU / 2)}
                  closed={false}
                  pointerEvents={false}
                />
                <Shape
                  stroke={4 * (1 / zoom)}
                  color={Colors.HOVER}
                  path={path}
                  rotate={vector.scale(rotation.direction, (TAU / 4) * 3)}
                  closed={false}
                  pointerEvents={false}
                />
              </>
            )}
          </Fragment>
        );
      })}
    </Shape>
  );
};

export default RotationGizmo;
