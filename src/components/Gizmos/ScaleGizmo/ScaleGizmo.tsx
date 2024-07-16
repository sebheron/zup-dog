import { Fragment, useCallback, useRef, useState } from "react";
import { Anchor, ElementProxy, Shape } from "react-zdog-alt";
import { Vector } from "zdog";
import useCamera from "@/components/Camera/useCamera";
import useScene from "@/components/Scene/useScene";
import { DilationType, Dilations } from "@/constants/Actions";
import Colors from "@/constants/Colors";
import Vector3Type from "@/types/Vector3Type";
import cam from "@/utils/cam";
import vector from "@/utils/vector";
import GizmoProps from "../GizmoProps";

const ScaleGizmo = ({ action, onAction, scaling }: GizmoProps) => {
  const { zoom } = useCamera();
  const { selected, update, select } = useScene();

  const [interactable, setInteractable] = useState<DilationType | null>(null);

  const handleDilationDown = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      dilation: DilationType,
      start: ElementProxy | null,
      end: ElementProxy | null,
    ) => {
      if (e.button !== 0) return;
      if (!start || !end || !selected || dilation === action) return;

      const dilationVector = new Vector(selected.props.scale as Vector3Type);
      const startVector = cam.screenPosition(start);
      const endVector = cam.screenPosition(end);
      let previousDistance: number | null = null;

      const handleDilation = (e: MouseEvent) => {
        const mouse = {
          x: e.clientX,
          y: e.clientY,
        };

        //Get the nearest point on the line
        const nearestPoint = vector.nearestPoint2d(
          startVector,
          endVector,
          mouse,
        );
        //Get the distance from the start point to the nearest point
        const distance = vector.direction2d(startVector, nearestPoint);

        //Find the direction the dilation should go
        const pointing =
          vector.direction2d(endVector, nearestPoint) < distance ? 1 : -1;

        //If the distance is null, set it to the current distance, prevents jumping
        if (previousDistance == null) previousDistance = distance;

        //Get the dilation direction
        const dilate = Dilations[dilation as DilationType]?.direction;

        //If we're not translating, return
        if (!dilate) return;

        //Calculate the difference in distance
        const diff = distance - previousDistance;

        //Adjust the dilation vector by an arbitrary number, the difference, the direction, and the zoom
        const delta = vector.scale(
          { x: dilate.x, y: -dilate.y, z: dilate.z },
          (diff / 30) * (1 / zoom) * pointing,
        );

        //Adjust the delta by the scaling
        delta.x *= scaling.x;
        delta.y *= scaling.y;
        delta.z *= scaling.z;

        //Add the delta to the dilation vector
        dilationVector.add(delta);

        //Update the distance
        previousDistance = distance;
      };

      const handleDilationEnd = () => {
        update(selected, {
          scale: {
            x: dilationVector.x,
            y: dilationVector.y,
            z: dilationVector.z,
          },
        });
        select(selected);
        onAction(null);
        document.removeEventListener("mousemove", handleDilation);
        document.removeEventListener("mouseup", handleDilationEnd);
      };

      e.stopPropagation();
      onAction(dilation);
      update(selected, {
        scale: dilationVector,
      });

      document.addEventListener("mousemove", handleDilation);
      document.addEventListener("mouseup", handleDilationEnd);
    },
    [zoom, scaling, selected, action, update, select, onAction],
  );

  return (
    <Anchor scale={1 / zoom}>
      {Object.entries(Dilations).map(([key, dilation]) => {
        const startShapeRef = useRef<ElementProxy>(null);
        const endShapeRef = useRef<ElementProxy>(null);

        const color =
          action === key || (!action && interactable === key)
            ? Colors.HOVER
            : dilation.color;
        const active = !action || action === key;
        return (
          <Fragment key={key}>
            <Anchor ref={startShapeRef} />
            <Shape
              ref={endShapeRef}
              translate={vector.scale(dilation.direction, 80)}
              stroke={12 * (1 / zoom)}
              color={color}
              visible={active}
              pointerEvents={false}
            />
            <Shape
              onPointerEnter={() => setInteractable(key as DilationType)}
              onPointerLeave={() => setInteractable(null)}
              onPointerDown={(e) =>
                handleDilationDown(
                  e,
                  key as DilationType,
                  startShapeRef.current,
                  endShapeRef.current,
                )
              }
              ref={endShapeRef}
              translate={vector.scale(dilation.direction, 80)}
              stroke={30 * (1 / zoom)}
              color={color}
              visible={false}
              pointerEvents
            />
            {action === key && (
              <>
                <Shape
                  stroke={4 * (1 / zoom)}
                  color={color}
                  path={[{}, vector.scale(dilation.direction, 80)]}
                  pointerEvents={false}
                />
                <Shape
                  stroke={8 * (1 / zoom)}
                  color={Colors.HOVER}
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

export default ScaleGizmo;
