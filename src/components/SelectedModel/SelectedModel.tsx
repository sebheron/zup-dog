import { useState } from "react";
import { Shape } from "react-zdog-alt";
import useScene from "@/components/Scene/useScene";
import { ActionType } from "@/constants/Actions";
import InstanceType from "@/types/InstanceType";
import RotationGizmo from "../Gizmos/RotationGizmo/RotationGizmo";
import TranslationGizmo from "../Gizmos/TranslationGizmo/TranslationGizmo";

interface Props {
  objects: InstanceType[];
}

const SelectedModel = ({ objects }: Props) => {
  const { selected } = useScene();
  const [action, setAction] = useState<ActionType | null>(null);

  return selected
    ? objects.map((obj) => {
        const { translate, rotate, scale } = obj.props;

        if (selected.id === obj.id)
          return (
            <Shape
              key={obj.id}
              translate={translate}
              scale={scale}
              color="transparent"
            >
              <RotationGizmo action={action} onAction={setAction} />
              <TranslationGizmo action={action} onAction={setAction} />
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
