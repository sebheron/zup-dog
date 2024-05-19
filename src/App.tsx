import { CgShapeSquare, CgShapeCircle, CgShapeHexagon } from "react-icons/cg";
import { IoShapes } from "react-icons/io5";

import { Camera } from "./components/Camera/Camera";
import Bar from "./components/Bar/Bar";
import Button from "./components/Button/Button";
import Gizmo from "./components/Gizmo/Gizmo";
import Logo from "./components/Logo/Logo";
import Viewport from "./components/Viewport/Viewport";

function App() {
  return (
    <Camera>
      <Bar>
        <Logo />
        <Bar.Splitter />
        <Button>
          <CgShapeSquare />
        </Button>
        <Button>
          <CgShapeCircle />
        </Button>
        <Button>
          <CgShapeHexagon />
        </Button>
        <Bar.Splitter />
        <Button>
          <IoShapes />
        </Button>
      </Bar>
      <Viewport />
      <Gizmo />
    </Camera>
  );
}

export default App;
