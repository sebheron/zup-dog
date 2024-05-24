import { Fragment, useCallback, useState } from "react";
import { Cone, Shape } from "react-zdog-alt";
import useCamera from "@/components/Camera/useCamera";
import Colors from "@/constants/Colors";
import Translations, { TranslationType } from "@/constants/Translations";
import VectorType from "@/types/VectorType";
import vector from "@/utils/vector";

interface Props {
  position: VectorType;
  selectedTranslation: TranslationType | null;
  onBeginTranslation: (arrow: TranslationType) => void;
}

const TranslationGizmo = ({
  position,
  selectedTranslation,
  onBeginTranslation: onSelectArrow,
}: Props) => {
  const { zoom } = useCamera();

  const [interactable, setInteractable] = useState<TranslationType | null>(
    null,
  );

  const handleTranslationDown = useCallback(
    (e: React.MouseEvent<HTMLElement>, translation: TranslationType) => {
      onSelectArrow(translation);
      e.stopPropagation();
    },
    [onSelectArrow],
  );

  return (
    <Shape translate={position} scale={1 / zoom}>
      {Object.entries(Translations).map(([key, translation]) => {
        const color =
          selectedTranslation === key ||
          (!selectedTranslation && interactable === key)
            ? Colors.HOVER
            : translation.color;
        return (
          <Fragment key={key}>
            <Shape
              stroke={4 * (1 / zoom)}
              color={color}
              path={[{}, vector.scale(translation.direction, 50)]}
            />
            <Cone
              translate={vector.scale(translation.direction, 50)}
              rotate={translation.rotation}
              diameter={10}
              length={20}
              color={color}
              backface={true}
            />
            <Shape
              onPointerEnter={() => setInteractable(key as TranslationType)}
              onPointerLeave={() => setInteractable(null)}
              onPointerDown={(e) =>
                handleTranslationDown(e, key as TranslationType)
              }
              stroke={30 * (1 / zoom)}
              path={[{}, vector.scale(translation.direction, 70)]}
              visible={false}
              pointerEvents
            />
          </Fragment>
        );
      })}
    </Shape>
  );
};

export default TranslationGizmo;
