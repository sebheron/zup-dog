import { Fragment } from "react";
import { Shape } from "react-zdog-alt";
import Colors from "@/constants/Colors";

interface Props {
  length: number;
  cellSize: number;
}

const Grid = ({ length, cellSize }: Props) => {
  return Array.from({ length: length / cellSize + 1 }, (_, i) => (
    <Fragment key={i}>
      <Shape
        pointerEvents={false}
        stroke={1}
        color={Colors.GRID}
        path={[
          { x: -length / 2, z: -length / 2 + i * cellSize },
          { x: length / 2, z: -length / 2 + i * cellSize },
        ]}
      />
      <Shape
        pointerEvents={false}
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
