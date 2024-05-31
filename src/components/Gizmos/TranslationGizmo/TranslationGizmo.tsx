import { Fragment, useCallback, useRef, useState } from "react";
import { Anchor, Cone, ElementProxy, Shape } from "react-zdog-alt";
import { Vector } from "zdog";
import useCamera from "@/components/Camera/useCamera";
import useScene from "@/components/Scene/useScene";
import { TranslationType, Translations } from "@/constants/Actions";
import Colors from "@/constants/Colors";
import cam from "@/utils/cam";
import vector from "@/utils/vector";
import GizmoProps from "../GizmoProps";

const TranslationGizmo = ({ action, onAction }: GizmoProps) => {
  const { zoom } = useCamera();
  const { selected, update, select } = useScene();

  const [interactable, setInteractable] = useState<TranslationType | null>(
    null,
  );

  const handleTranslationDown = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      translation: TranslationType,
      start: ElementProxy | null,
      end: ElementProxy | null,
    ) => {
      if (!start || !end || !selected || translation === action) return;

      const translationVector = new Vector(selected.props.translate);
      const startVector = cam.screenPosition(start);
      const endVector = cam.screenPosition(end);
      let previousDistance: number | null = null;

      const handleTranslation = (e: MouseEvent) => {
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

        //Find the direction the translation should go
        const pointing =
          vector.direction2d(endVector, nearestPoint) < distance ? 1 : -1;

        //If the distance is null, set it to the current distance, prevents jumping
        if (previousDistance == null) previousDistance = distance;

        //Get the translation direction
        const translate =
          Translations[translation as TranslationType]?.direction;

        //If we're not translating, return
        if (!translate) return;

        //Calculate the difference in distance
        const diff = distance - previousDistance;

        //Adjust the translation vector by the difference, the direction, and the zoom
        const delta = vector.scale(translate, diff * (1 / zoom) * pointing);

        //Add the delta to the translation vector
        translationVector.add(delta);

        //Update the distance
        previousDistance = distance;
      };

      const handleTranslationEnd = () => {
        update(selected, {
          translation: {
            x: translationVector.x,
            y: translationVector.y,
            z: translationVector.z,
          },
        });
        select(selected);
        onAction(null);
        document.removeEventListener("mousemove", handleTranslation);
        document.removeEventListener("mouseup", handleTranslationEnd);
      };

      e.stopPropagation();
      onAction(translation);
      update(selected, {
        translate: translationVector,
      });

      document.addEventListener("mousemove", handleTranslation);
      document.addEventListener("mouseup", handleTranslationEnd);
    },
    [selected, action, update, select, onAction, zoom],
  );

  return (
    <Anchor scale={1 / zoom}>
      {Object.entries(Translations).map(([key, translation]) => {
        const startShapeRef = useRef<ElementProxy>(null);
        const endShapeRef = useRef<ElementProxy>(null);

        const color =
          action === key || (!action && interactable === key)
            ? Colors.HOVER
            : translation.color;
        const active = !action || action === key;
        return (
          <Fragment key={key}>
            <Shape
              ref={startShapeRef}
              stroke={4 * (1 / zoom)}
              color={color}
              path={[{}, vector.scale(translation.direction, 50)]}
              visible={active}
              pointerEvents={false}
            />
            <Cone
              ref={endShapeRef}
              translate={vector.scale(translation.direction, 50)}
              rotate={translation.rotation}
              diameter={10}
              length={20}
              color={color}
              backface={true}
              visible={active}
              pointerEvents={false}
            />
            <Shape
              onPointerEnter={() => setInteractable(key as TranslationType)}
              onPointerLeave={() => setInteractable(null)}
              onPointerDown={(e) =>
                handleTranslationDown(
                  e,
                  key as TranslationType,
                  startShapeRef.current,
                  endShapeRef.current,
                )
              }
              stroke={30 * (1 / zoom)}
              path={[{}, vector.scale(translation.direction, 70)]}
              visible={false}
              pointerEvents
            />
            {action === key && (
              <Shape
                stroke={8 * (1 / zoom)}
                color={Colors.HOVER}
                pointerEvents={false}
              />
            )}
          </Fragment>
        );
      })}
    </Anchor>
  );
};

export default TranslationGizmo;
