import { Fragment } from "react";
import Components from "@/constants/Components";
import InstanceType from "@/types/InstanceType";

interface Props {
  objects: InstanceType[];
  onClick: (instance: InstanceType) => void;
}

const Model = ({ objects, onClick }: Props) =>
  objects.map((obj) => {
    const Component = Components[obj.shape];
    return (
      <Fragment key={obj.id}>
        <Component {...obj.props} onClick={() => onClick(obj)}>
          {obj.children && <Model objects={obj.children} onClick={onClick} />}
        </Component>
      </Fragment>
    );
  });

export default Model;
