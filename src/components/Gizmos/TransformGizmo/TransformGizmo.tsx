import { useCallback, useState } from "react";
import { Cone, Shape } from "react-zdog";
import Colors from "@/constants/Colors";
import EntityDeclaration from "@/types/EntityType";

interface Props {
  entity: EntityDeclaration;
}

enum Interactables {
  ArrowY,
  ArrowX,
  ArrowZ,
}

const TransformGizmo = ({ entity }: Props) => {
  const [interactable, setInteractable] = useState<Interactables | null>(null);

  const handleConeClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <Shape translate={entity.props.translate ?? undefined}>
      <Shape
        path={[
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 50 },
        ]}
        stroke={2}
        color={Colors.ZAXIS}
      />
      <Shape
        path={[
          { x: 0, y: 0, z: 0 },
          { x: 50, y: 0, z: 0 },
        ]}
        stroke={2}
        color={Colors.XAXIS}
      />
      <Shape
        path={[
          { x: 0, y: 0, z: 0 },
          { x: 0, y: -50, z: 0 },
        ]}
        stroke={2}
        color={Colors.YAXIS}
      />
      <Cone
        onPointerEnter={() => setInteractable(Interactables.ArrowY)}
        onPointerLeave={() => setInteractable(null)}
        onClick={handleConeClick}
        translate={{ z: 50 }}
        diameter={10}
        length={20}
        color={Colors.ZAXIS}
        backface={true}
      />
      <Cone
        onPointerEnter={() => setInteractable(Interactables.ArrowX)}
        onPointerLeave={() => setInteractable(null)}
        onClick={handleConeClick}
        translate={{ x: 50 }}
        rotate={{ y: -Math.PI / 2 }}
        diameter={10}
        length={20}
        color={Colors.XAXIS}
        backface={true}
      />
      <Cone
        onPointerEnter={() => setInteractable(Interactables.ArrowZ)}
        onPointerLeave={() => setInteractable(null)}
        onClick={handleConeClick}
        translate={{ y: -50 }}
        rotate={{ x: Math.PI / 2 }}
        diameter={10}
        length={20}
        color={Colors.YAXIS}
        backface={true}
      />
    </Shape>
  );
};

export default TransformGizmo;
