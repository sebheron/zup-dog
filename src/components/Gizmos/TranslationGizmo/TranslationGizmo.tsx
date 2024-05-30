import { Fragment, useCallback, useRef, useState } from "react";
import { Cone, ElementRef, Shape } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import { TranslationType, Translations } from "@/constants/Actions";
import Colors from "@/constants/Colors";
import vector from "@/utils/vector";
import GizmoProps from "../GizmoProps";

const TranslationGizmo = ({ action, onAction }: GizmoProps) => {
  const { zoom } = useCamera();

  const [interactable, setInteractable] = useState<TranslationType | null>(
    null,
  );

  const handleTranslationDown = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      translation: TranslationType,
      start: ElementRef | null,
      end: ElementRef | null,
    ) => {
      if (!start || !end) return;
      const startPoint = start.Item.renderOrigin;
      const endPoint = end.Item.renderOrigin;
      onAction(translation);
      e.stopPropagation();
    },
    [onAction],
  );

  return (
    <Shape scale={1 / zoom} color="transparent">
      {Object.entries(Translations).map(([key, translation]) => {
        const startRef = useRef<ElementRef>(null);
        const endRef = useRef<ElementRef>(null);

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
    </Shape>
  );
};

export default TranslationGizmo;
