import { Suspense, lazy } from "react";
import { CgShapeSquare, CgShapeCircle, CgShapeHexagon } from "react-icons/cg";
import { IoShapes } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";
import { Tooltip } from "react-tooltip";

import Bar from "./components/Bar/Bar";
import Button from "./components/Button/Button";
import Loading from "./components/Loading/Loading";
import Toast from "./components/Toast/Toast";
import Card from "./components/Card/Card";
const Camera = lazy(() => import("./components/Camera/Camera"));
const Logo = lazy(() => import("./components/Logo/Logo"));
const Gizmo = lazy(() => import("./components/Gizmo/Gizmo"));
const Viewport = lazy(() => import("./components/Viewport/Viewport"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Tooltip />
      <Toast>
        <Camera>
          <Viewport>
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
              <Button>
                <IoShapes />
              </Button>
              <Bar.Splitter />
              <Button>
                <BiSolidCameraMovie />
              </Button>
            </Bar>
            <Gizmo />
            <Card position="left"></Card>
            <Card position="right"></Card>
          </Viewport>
        </Camera>
      </Toast>
    </Suspense>
  );
}

export default App;
