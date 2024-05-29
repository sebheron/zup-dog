import { Fragment, useCallback } from "react";
import useScene from "@/components/Scene/useScene";
import Components from "@/constants/Components";
import InstanceType from "@/types/InstanceType";

interface Props {
  objects: InstanceType[];
  onClick: (instance: InstanceType) => void;
}

const Model = ({ objects, onClick }: Props) => {
  const { selected } = useScene();

  const getSelectedProps = useCallback(
    (obj: InstanceType) => ({
      stroke: ((obj.props.stroke as number) ?? 1) + 4,
      color: "black",
      fill: false,
      frontFace: true,
      rearFace: true,
      leftFace: true,
      rightFace: true,
      topFace: true,
      bottomFace: true,
      backface: true,
    }),
    [selected],
  );

  return objects.map((obj) => {
    const Component = Components[obj.shape];
    const selectedProps = getSelectedProps(obj);

    return (
      <Fragment key={obj.id}>
        <Component {...obj.props} onClick={() => onClick(obj)}>
          {obj.children && <Model objects={obj.children} onClick={onClick} />}
        </Component>
        {selected?.id === obj.id && (
          <Component
            {...obj.props}
            {...selectedProps}
            onClick={() => onClick(obj)}
          />
        )}
      </Fragment>
    );
  });
};

export default Model;
