import EntityType from "@/types/EntityType";

interface Props {
  entities: EntityType[];
}

const Entity = ({ entities }: Props) => {
  return entities.map(({ id, component: Component, props, children }) => {
    return (
      <Component key={id} {...props}>
        {children && <Entity entities={children} />}
      </Component>
    );
  });
};

export default Entity;
