import { useCallback } from "react";
import { Shape } from "react-zdog-alt";
import useScene from "@/components/Scene/useScene";
import InstanceType from "@/types/InstanceType";
import RotationGizmo from "../Gizmos/RotationGizmo/RotationGizmo";
import TranslationGizmo from "../Gizmos/TranslationGizmo/TranslationGizmo";

interface Props {
  objects: InstanceType[];
}

const SelectedModel = ({ objects }: Props) => {
  const { selected } = useScene();

  const getRequiredProps = useCallback(
    (object: InstanceType) => ({
      translate: object.props.translate ?? { x: 0, y: 0, z: 0 },
      rotate: object.props.rotate ?? { x: 0, y: 0, z: 0 },
      scale: object.props.scale ?? 1,
    }),
    [],
  );

  return selected
    ? objects.map((obj) => {
        const { translate, rotate, scale } = getRequiredProps(obj);

        if (selected.id === obj.id)
          return (
            <Shape
              color="transparent"
              translate={translate}
              scale={scale}
              key={obj.id}
            >
              <RotationGizmo />
              <TranslationGizmo />
            </Shape>
          );
        else if (obj.children)
          return (
            <Shape
              color="transparent"
              translate={translate}
              rotate={rotate}
              scale={scale}
              key={obj.id}
            >
              <SelectedModel objects={obj.children} />
            </Shape>
          );
        else return null;
      })
    : null;
};

export default SelectedModel;
