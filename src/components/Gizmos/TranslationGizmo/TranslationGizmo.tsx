import { Fragment, useCallback, useRef, useState } from "react";
import { Cone, ElementProxy, Shape } from "react-zdog-alt";
import { Vector } from "zdog";
import useCamera from "@/components/Camera/useCamera";
import DocEvent from "@/components/DocEvent/DocEvent";
import useScene from "@/components/Scene/useScene";
import { TranslationType, Translations } from "@/constants/Actions";
import Colors from "@/constants/Colors";
import Vector2Type from "@/types/Vector2Type";
import cam from "@/utils/cam";
import vector from "@/utils/vector";

const TranslationGizmo = () => {
  const { zoom } = useCamera();
  const { selected, update, select } = useScene();

  const [action, setAction] = useState<TranslationType | null>(null);
  const [interactable, setInteractable] = useState<TranslationType | null>(
    null,
  );

  const distanceRef = useRef<number | null>(null);
  const startRef = useRef<Vector2Type>({ x: 0, y: 0 });
  const endRef = useRef<Vector2Type>({ x: 0, y: 0 });
  const transformRef = useRef<Vector>(new Vector());

  const handleTranslationDown = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      translation: TranslationType,
      start: ElementProxy | null,
      end: ElementProxy | null,
    ) => {
      if (!start || !end || !selected || translation === action) return;
      transformRef.current.set(selected?.props.translate ?? {});
      startRef.current = cam.screenPosition(start);
      endRef.current = cam.screenPosition(end);
      distanceRef.current = null;
      setAction(translation);
      update(selected, {
        translate: transformRef.current,
      });
      e.stopPropagation();
    },
    [action, selected, update],
  );

  const handleTranslationEnd = useCallback(() => {
    if (!selected || !action) return;
    update(selected, {
      translate: {
        x: transformRef.current.x,
        y: transformRef.current.y,
        z: transformRef.current.z,
      },
    });
    select(selected);
    setAction(null);
  }, [selected, action, update, select]);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (e.buttons !== 1 && action) {
        handleTranslationEnd();
        return;
      }

      const mouse = {
        x: e.clientX,
        y: e.clientY,
      };

      //Get the nearest point on the line
      const nearestPoint = vector.nearestPoint(
        startRef.current,
        endRef.current,
        mouse,
      );
      //Get the distance from the start point to the nearest point
      const distance = vector.direction2d(startRef.current, nearestPoint);

      //Find the direction the translation should go
      const pointing =
        vector.direction2d(endRef.current, nearestPoint) < distance ? 1 : -1;

      //If the distance is null, set it to the current distance
      if (distanceRef.current == null) distanceRef.current = distance;

      //Get the translation direction
      const translate = Translations[action as TranslationType].direction;

      //Calculate the difference in distance
      const diff = distance - distanceRef.current;

      //Adjust the translation vector by the difference, the direction, and the zoom
      const delta = vector.scale(translate, diff * (1 / zoom) * pointing);

      //Add the delta to the translation vector
      transformRef.current.add(delta);

      //Update the distance
      distanceRef.current = distance;
    },
    [zoom, action, handleTranslationEnd],
  );

  return (
    <Shape scale={1 / zoom} color="transparent">
      {Object.entries(Translations).map(([key, translation]) => {
        const startRef = useRef<ElementProxy>(null);
        const endRef = useRef<ElementProxy>(null);

        const color =
          action === key || (!action && interactable === key)
            ? Colors.HOVER
            : translation.color;
        const active = !action || action === key;
        return (
          <Fragment key={key}>
            <Shape
              ref={startRef}
              stroke={4 * (1 / zoom)}
              color={color}
              path={[{}, vector.scale(translation.direction, 50)]}
              visible={active}
              pointerEvents={false}
            />
            <Cone
              ref={endRef}
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
                  startRef.current,
                  endRef.current,
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
      {!!action && <DocEvent type="mousemove" listener={handleMove} />}
    </Shape>
  );
};

export default TranslationGizmo;
