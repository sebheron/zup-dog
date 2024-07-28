import { useCallback } from "react";
import Components from "@/constants/Components";
import InstanceType from "@/types/InstanceType";

interface Props {
  object: InstanceType;
  hide?: unknown;
  onClick: (instance: InstanceType) => void;
}

const Model = ({ object, hide, onClick }: Props) => {
  const Component = Components[object.shape];
  const props = { ...object.props, visible: object.props.visible && !hide };

  const handleModelClick = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, instance: InstanceType) => {
      e.stopPropagation();
      onClick(instance);
    },
    [onClick],
  );

  return (
    <Component {...props} onClick={(e) => handleModelClick(e, object)}>
      {object.children?.map((child) => (
        <Model
          key={JSON.stringify(child)}
          object={child}
          onClick={onClick}
          hide={hide || !object.props.visible}
        />
      ))}
    </Component>
  );
};

export default Model;
