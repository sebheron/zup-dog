import { Fragment } from "react";
import { Shape } from "react-zdog";
import Colors from "@/constants/Colors";

interface Props {
  length: number;
  cellSize: number;
}

const Grid = ({ length, cellSize }: Props) => {
  return Array.from({ length: length / cellSize + 1 }, (_, i) => (
    <Fragment key={`row-${i}`}>
      <Shape
        stroke={1}
        color={Colors.GRID}
        path={[
          { x: -length / 2, z: -length / 2 + i * cellSize },
          { x: length / 2, z: -length / 2 + i * cellSize },
        ]}
      />
      <Shape
        stroke={1}
        color={Colors.GRID}
        path={[
          { x: -length / 2 + i * cellSize, z: -length / 2 },
          { x: -length / 2 + i * cellSize, z: length / 2 },
        ]}
      />
    </Fragment>
  ));
};

export default Grid;
