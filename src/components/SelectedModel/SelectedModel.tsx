import { PropsWithChildren, useCallback } from "react";
import { Shape } from "react-zdog-alt";
import useScene from "@/components/Scene/useScene";
import InstanceType from "@/types/InstanceType";

interface Props extends PropsWithChildren {
  objects: InstanceType[];
}

const SelectedModel = ({ children, objects }: Props) => {
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
        const requiredProps = getRequiredProps(obj);

        if (selected.id === obj.id)
          return (
            <Shape color="transparent" {...requiredProps} key={obj.id}>
              {children}
            </Shape>
          );
        else if (obj.children)
          return (
            <Shape color="transparent" {...requiredProps} key={obj.id}>
              <SelectedModel objects={obj.children}>{children}</SelectedModel>
            </Shape>
          );
        else return null;
      })
    : null;
};

export default SelectedModel;
