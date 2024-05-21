import { nanoid } from "nanoid";
import { Suspense, lazy, useCallback, useState } from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
import { CgShapeCircle, CgShapeHexagon, CgShapeSquare } from "react-icons/cg";
import { IoShapes } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import Bar from "@/components/Bar/Bar";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Loading from "@/components/Loading/Loading";
import Toast from "@/components/Toast/Toast";
import Entities from "@/constants/Entities";
import EntityType from "./types/EntityType";

const Camera = lazy(() => import("@/components/Camera/Camera"));
const Logo = lazy(() => import("@/components/Logo/Logo"));
const Gizmo = lazy(() => import("@/components/Gizmos/ScreenGizmo/ScreenGizmo"));
const Viewport = lazy(() => import("@/components/Viewport/Viewport"));

function App() {
  const [entities, setEntities] = useState<EntityType[]>([]);

  const add = useCallback((entity: Omit<EntityType, "id">) => {
    const entityWithId = {
      ...entity,
      id: nanoid(),
      props: { ...entity.props },
    };
    setEntities((prev) => [...prev, entityWithId]);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Tooltip />
      <Toast>
        <Camera>
          <Viewport entities={entities}>
            <Bar>
              <Logo />
              <Bar.Splitter />
              <Button onClick={() => add(Entities.BOX)}>
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
