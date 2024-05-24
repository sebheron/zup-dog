import { Fragment } from "react";
import useScene from "@/components/Scene/useScene";
import Components from "@/constants/Components";
import InstanceType from "@/types/InstanceType";

interface Props {
  objects: InstanceType[];
  onClick: (id: string) => void;
}

const Model = ({ objects, onClick }: Props) => {
  const { selected } = useScene();

  return objects.map((obj) => {
    const Component = Components[obj.shape];
    const highlightProps = {
      stroke: ((obj.props.stroke as number) ?? 1) + 5,
      color: "#6d59ff45",
      fill: false,
    };

    return (
      <Fragment key={obj.id}>
        <Component {...obj.props} onClick={() => onClick(obj.id)}>
          {obj.children && <Model objects={obj.children} onClick={onClick} />}
        </Component>
        {selected.includes(obj.id) && (
          <Component {...obj.props} {...highlightProps} pointerEvents={false} />
        )}
      </Fragment>
    );
  });
};

export default Model;
