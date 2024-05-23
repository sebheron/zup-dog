import { Fragment, useCallback } from "react";
import useScene from "@/components/Scene/useScene";
import ObjectInstance from "@/types/ObjectInstance";

interface Props {
  objects: ObjectInstance[];
}

const Model = ({ objects }: Props) => {
  const { selected, select } = useScene();

  const handleClick = useCallback(
    (obj: ObjectInstance) => {
      select((prev) => (prev?.id === obj.id ? null : obj));
    },
    [select],
  );

  return objects.map((obj) => {
    const highlightProps = {
      stroke: ((obj.props.stroke as number) ?? 1) + 5,
      color: "#6d59ff45",
      fill: false,
    };

    return (
      <Fragment key={obj.id}>
        <obj.component {...obj.props} onClick={() => handleClick(obj)}>
          {obj.children && <Model objects={obj.children} />}
        </obj.component>
        {selected?.id === obj.id && (
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
