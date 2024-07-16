import { useCallback, useState } from "react";
import { Anchor } from "react-zdog-alt";
import RotationGizmo from "@/components/Gizmos/RotationGizmo/RotationGizmo";
import TranslationGizmo from "@/components/Gizmos/TranslationGizmo/TranslationGizmo";
import useScene from "@/components/Scene/useScene";
import { ActionType } from "@/constants/Actions";
import InstanceType from "@/types/InstanceType";
import Vector3Type from "@/types/Vector3Type";
import ScaleGizmo from "../Gizmos/ScaleGizmo/ScaleGizmo";

interface Props {
  objects: InstanceType[];
  scaler?: Partial<Vector3Type>[];
}

const SelectedModel = ({ objects, scaler = [] }: Props) => {
  const { selected } = useScene();
  const [action, setAction] = useState<ActionType | null>(null);

  const invertScale = useCallback(() => {
    const invertedVector = { x: 1, y: 1, z: 1 };

    for (const scale of scaler) {
      invertedVector.x *= 1 / (scale.x ?? 1);
      invertedVector.y *= 1 / (scale.y ?? 1);
      invertedVector.z *= 1 / (scale.z ?? 1);
    }

    return invertedVector;
  }, [scaler]);

  return selected
    ? objects.map((obj) => {
        const { translate, rotate, scale } = obj.props;

        //TODO: Fix weird issues with selections and rotations

        if (selected.id === obj.id) {
          const invertedScale = invertScale();

          return (
            <Anchor key={obj.id} translate={translate} scale={invertedScale}>
              <RotationGizmo action={action} onAction={setAction} />
              <TranslationGizmo
                action={action}
                onAction={setAction}
                scaling={invertedScale}
              />
              <ScaleGizmo
                action={action}
                onAction={setAction}
                scaling={invertedScale}
              />
            </Anchor>
          );
        } else if (obj.children) {
          return (
            <Anchor
              translate={translate}
              rotate={rotate}
              scale={scale}
              key={obj.id}
            >
              <SelectedModel
                objects={obj.children}
                scaler={[...scaler, scale as Vector3Type]}
              />
            </Anchor>
          );
        } else return null;
      })
    : null;
};

export default SelectedModel;
