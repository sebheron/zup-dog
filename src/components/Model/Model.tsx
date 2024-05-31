import { Fragment, useCallback } from "react";
import Components from "@/constants/Components";
import InstanceType from "@/types/InstanceType";

interface Props {
  objects: InstanceType[];
  hide?: unknown;
  onClick: (instance: InstanceType) => void;
}

const Model = ({ objects, hide, onClick }: Props) => {
  const handleModelClick = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, instance: InstanceType) => {
      e.stopPropagation();
      onClick(instance);
    },
    [onClick],
  );

  return objects.map((obj) => {
    const Component = Components[obj.shape];
    const props = { ...obj.props, visible: obj.props.visible && !hide };
    return (
      <Fragment key={obj.id}>
        <Component {...props} onClick={(e) => handleModelClick(e, obj)}>
          {obj.children && (
            <Model
              objects={obj.children}
              onClick={onClick}
              hide={hide || !obj.props.visible}
            />
          )}
        </Component>
      </Fragment>
    );
  });
};

export default Model;
