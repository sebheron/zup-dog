import { Fragment } from "react";
import useScene from "@/components/Scene/useScene";
import ObjectInstanceType from "@/types/ObjectInstanceType";

interface Props {
  objects: ObjectInstanceType[];
  onClick: (id: string) => void;
}

const Model = ({ objects, onClick }: Props) => {
  const { selected } = useScene();

  return objects.map((obj) => {
    const highlightProps = {
      stroke: ((obj.props.stroke as number) ?? 1) + 5,
      color: "#6d59ff45",
      fill: false,
    };
    return (
      <Fragment key={obj.id}>
        <obj.component {...obj.props} onClick={() => onClick(obj.id)}>
          {obj.children && <Model objects={obj.children} onClick={onClick} />}
        </obj.component>
        {selected.includes(obj.id) && (
          <obj.component
            {...obj.props}
            {...highlightProps}
            pointerEvents={false}
          />
        )}
      </Fragment>
    );
  });
};

export default Model;
