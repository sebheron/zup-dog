import { Fragment, useCallback, useRef, useState } from "react";
import { Anchor, ElementProxy, Ellipse, Shape } from "react-zdog-alt";
import { PathCommand, TAU, Vector } from "zdog";
import useCamera from "@/components/Camera/useCamera";
import DocEvent from "@/components/DocEvent/DocEvent";
import useScene from "@/components/Scene/useScene";
import { RotationType, Rotations } from "@/constants/Actions";
import Colors from "@/constants/Colors";
import Vector2Type from "@/types/Vector2Type";
import cam from "@/utils/cam";
import vector from "@/utils/vector";
import GizmoProps from "../GizmoProps";

const RotationGizmo = ({ action, onAction }: GizmoProps) => {
  const { zoom } = useCamera();
  const { selected, update, select } = useScene();

  const [interactable, setInteractable] = useState<RotationType | null>(null);

  const angleRef = useRef<number | null>(null);
  const centerRef = useRef<Vector2Type>({ x: 0, y: 0 });
  const pointingRef = useRef<number>(0);
  const rotationRef = useRef<Vector>(new Vector());

  const handleRotationDown = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      rotation: RotationType,
      center: ElementProxy | null,
      direction: ElementProxy | null,
    ) => {
      if (!center || !direction || !selected || rotation === action) return;
      e.stopPropagation();
      rotationRef.current.set(selected?.props.rotate);
      centerRef.current = cam.screenPosition(center, zoom);
      // Determine the direction of the rotation using the direction shape
      pointingRef.current = direction.isFacingBack ? -1 : 1;
      angleRef.current = null;

      onAction(rotation);
      update(selected, {
        rotate: rotationRef.current,
      });
    },
    [action, selected, zoom, update, onAction],
  );

  const handleRotationEnd = useCallback(() => {
    if (!selected || !action) return;
    update(selected, {
      rotate: {
        x: rotationRef.current.x,
        y: rotationRef.current.y,
        z: rotationRef.current.z,
      },
    });
    select(selected);
    onAction(null);
  }, [selected, action, update, select, onAction]);

  const handleRotation = useCallback(
    (e: MouseEvent) => {
      if (!action) return;
      else if (e.buttons !== 1 && action) {
        handleRotationEnd();
        return;
      }

      const mouse = {
        x: e.clientX,
        y: e.clientY,
      };

      // Calculate the angle between the mouse and the center of the rotation gizmo
      const angle = vector.angle2d(centerRef.current, mouse);

      // If the angle reference is null, set it to the current angle, preventing a jump
      if (angleRef.current === null) angleRef.current = angle;

      // Get the rotation direction
      const rotate = Rotations[action as RotationType]?.direction;

      // If we're not rotating, return
      if (!rotate) return;

      // Calculate the difference in angles
      const diff = angle - angleRef.current;

      // Adjust the rotation vector based on the difference in angles
      const delta = vector.scale(rotate, diff * pointingRef.current);

      // Add the delta to the current rotation
      rotationRef.current.set(vector.globalRotate(rotationRef.current, delta));

      // Update the angle
      angleRef.current = angle;
    },
    [action, handleRotationEnd],
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
      {action && <DocEvent type="mouseup" listener={handleRotationEnd} />}
      <DocEvent type="mousemove" listener={handleRotation} />
    </Anchor>
  );
};

export default RotationGizmo;
