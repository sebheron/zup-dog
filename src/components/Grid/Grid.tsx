import { Shape } from "react-zdog";

interface Props {
  length: number;
  cellSize: number;
}

const Grid = ({ length, cellSize }: Props) => {
  return Array.from({ length: length / cellSize + 1 }, (_, i) => (
    <>
      <Shape
        key={`row-${i}`}
        stroke={1}
        color="#989898"
        path={[
          { x: -length / 2, z: -length / 2 + i * cellSize },
          { x: length / 2, z: -length / 2 + i * cellSize },
        ]}
      />
      <Shape
        key={`col-${i}`}
        stroke={1}
        color="#989898"
        path={[
          { x: -length / 2 + i * cellSize, z: -length / 2 },
          { x: -length / 2 + i * cellSize, z: length / 2 },
        ]}
      />
    </>
  ));
};

export default Grid;
