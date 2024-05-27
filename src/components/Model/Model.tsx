import Color from "color";
import { Fragment, useCallback } from "react";
import useScene from "@/components/Scene/useScene";
import Components from "@/constants/Components";
import InstanceType from "@/types/InstanceType";

interface Props {
  objects: InstanceType[];
  onClick: (id: string) => void;
}

const Model = ({ objects, onClick }: Props) => {
  const { selected } = useScene();

  const getColors = useCallback(
    (obj: InstanceType) => {
      if (!selected.length) return {};
      const isSelected = selected.includes(obj.id);
      const newColors: Record<string, string> = {};
      if (typeof obj.props.color === "string") {
        newColors.color = !isSelected
          ? Color(obj.props.color).alpha(0.5).darken(0.25).hexa()
          : obj.props.color;
      }
      if (typeof obj.props.frontFace === "string") {
        newColors.frontFace = !isSelected
          ? Color(obj.props.frontFace).alpha(0.5).darken(0.25).hexa()
          : obj.props.frontFace;
      }
      if (typeof obj.props.rearFace === "string") {
        newColors.rearFace = !isSelected
          ? Color(obj.props.rearFace).alpha(0.5).darken(0.25).hexa()
          : obj.props.rearFace;
      }
      if (typeof obj.props.leftFace === "string") {
        newColors.leftFace = !isSelected
          ? Color(obj.props.leftFace).alpha(0.5).darken(0.25).hexa()
          : obj.props.leftFace;
      }
      if (typeof obj.props.rightFace === "string") {
        newColors.rightFace = !isSelected
          ? Color(obj.props.rightFace).alpha(0.5).darken(0.25).hexa()
          : obj.props.rightFace;
      }
      if (typeof obj.props.topFace === "string") {
        newColors.topFace = !isSelected
          ? Color(obj.props.topFace).alpha(0.5).darken(0.25).hexa()
          : obj.props.topFace;
      }
      if (typeof obj.props.bottomFace === "string") {
        newColors.bottomFace = !isSelected
          ? Color(obj.props.bottomFace).alpha(0.5).darken(0.25).hexa()
          : obj.props.bottomFace;
      }
      if (typeof obj.props.backface === "string") {
        newColors.backface = !isSelected
          ? Color(obj.props.backface).alpha(0.5).darken(0.25).hexa()
          : obj.props.backface;
      }
      return newColors;
    },
    [selected],
  );

  return objects.map((obj) => {
    const Component = Components[obj.shape];
    const colorProps = getColors(obj);

    return (
      <Fragment key={obj.id}>
        <Component
          {...obj.props}
          {...colorProps}
          onClick={() => onClick(obj.id)}
        >
          {obj.children && <Model objects={obj.children} onClick={onClick} />}
        </Component>
      </Fragment>
    );
  });
};

export default Model;
