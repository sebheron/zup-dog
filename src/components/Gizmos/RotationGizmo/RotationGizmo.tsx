import { Fragment, useCallback, useRef, useState } from "react";
import { Anchor, ElementProxy, Ellipse, Shape } from "react-zdog-alt";
import { PathCommand, TAU, Vector } from "zdog";
import useCamera from "@/components/Camera/useCamera";
import useScene from "@/components/Scene/useScene";
import { RotationType, Rotations } from "@/constants/Actions";
import Colors from "@/constants/Colors";
import cam from "@/utils/cam";
import vector from "@/utils/vector";
import GizmoProps from "../GizmoProps";

const RotationGizmo = ({ action, onAction }: GizmoProps) => {
  const { zoom } = useCamera();
  const { selected, update, select } = useScene();

  const [interactable, setInteractable] = useState<RotationType | null>(null);

  const handleRotationDown = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      rotation: RotationType,
      center: ElementProxy | null,
      direction: ElementProxy | null,
    ) => {
      if (!center || !direction || !selected || rotation === action) return;

      const rotationVector = new Vector(selected.props.rotate);
      const centerVector = cam.screenPosition(center, zoom);
      // Determine the direction of the rotation using the direction shape
      const pointingDirection = direction.isFacingBack ? -1 : 1;
      let previousAngle: number | null = null;

      const handleRotation = (e: MouseEvent) => {
        const mouse = {
          x: e.clientX,
          y: e.clientY,
        };

        // Calculate the angle between the mouse and the center of the rotation gizmo
        const angle = vector.angle2d(centerVector, mouse);

        // If the angle reference is null, set it to the current angle, preventing a jump
        if (previousAngle == null) previousAngle = angle;

        // Get the rotation direction
        const rotate = Rotations[rotation as RotationType]?.direction;

        // If we're not rotating, return
        if (!rotate) return;

        // Calculate the difference in angles
        const diff = angle - previousAngle;

        // Adjust the rotation vector based on the difference in angles
        const delta = vector.scale(rotate, diff * pointingDirection);

        // Add the delta to the current rotation
        rotationVector.set(vector.globalRotate(rotationVector, delta));

        // Update the angle
        previousAngle = angle;
      };

      const handleRotationEnd = () => {
        update(selected, {
          rotate: {
            x: rotationVector.x,
            y: rotationVector.y,
            z: rotationVector.z,
          },
        });
        select(selected);
        onAction(null);
        document.removeEventListener("mousemove", handleRotation);
        document.removeEventListener("mouseup", handleRotationEnd);
      };

      e.stopPropagation();
      onAction(rotation);
      update(selected, {
        rotate: rotationVector,
      });

      document.addEventListener("mousemove", handleRotation);
      document.addEventListener("mouseup", handleRotationEnd);
    },
    [selected, action, update, select, onAction, zoom],
  );

  return (
    <Anchor scale={1 / zoom}>
      {Object.entries(Rotations).map(([key, rotation]) => {
        const centerShapeRef = useRef<ElementProxy>(null);
        const directionShapeRef = useRef<ElementProxy>(null);

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
            <Ellipse
              width={100}
              height={100}
              rotate={rotation.rotation}
              pointerEvents={false}
              color="transparent"
              ref={directionShapeRef}
            />
            <Anchor ref={centerShapeRef} />
            <Shape
              onPointerEnter={() => setInteractable(key as RotationType)}
              onPointerLeave={() => setInteractable(null)}
              onPointerDown={(e) =>
                handleRotationDown(
                  e,
                  key as RotationType,
                  centerShapeRef.current,
                  directionShapeRef.current,
                )
              }
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
    </Anchor>
  );
};

export default RotationGizmo;
