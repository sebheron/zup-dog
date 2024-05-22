import { Fragment, useCallback } from "react";
import useScene from "@/components/Scene/useScene";
import EntityType from "@/types/EntityType";

interface Props {
  entities: EntityType[];
}

const Entity = ({ entities }: Props) => {
  const { selected, select } = useScene();

  const handleClick = useCallback(
    (entity: EntityType) => {
      select((prev) => (prev?.id === entity.id ? null : entity));
    },
    [select],
  );

  return entities.map((entity) => {
    const highlightProps = {
      stroke: ((entity.props.stroke as number) ?? 1) + 5,
      color: "#6d59ff45",
      fill: false,
      closed: true,
    };

    return (
      <Fragment key={entity.id}>
        <entity.component {...entity.props} onClick={() => handleClick(entity)}>
          {entity.children && <Entity entities={entity.children} />}
        </entity.component>
        {selected?.id === entity.id && (
          <entity.component
            {...entity.props}
            {...highlightProps}
            onClick={() => select(null)}
          />
        )}
      </Fragment>
    );
  });
};

export default Entity;
