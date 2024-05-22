import { nanoid } from "nanoid";
import { Suspense, lazy, useCallback, useMemo, useState } from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
import Loading from "@/components/Loading/Loading";
import MenuItem from "@/components/MenuItem/MenuItem";
import SceneContext from "@/components/Scene/SceneContext";
import Entities from "@/constants/Entities";
import Shapes from "@/constants/Shapes";
import EntityDeclaration from "@/types/EntityDeclaration";
import MustDeclare from "@/types/MustDeclare";
import tooltip from "@/utils/tooltip";
import EntityType from "./types/EntityType";

const Bar = lazy(() => import("@/components/Bar/Bar"));
const Button = lazy(() => import("@/components/Button/Button"));
const Card = lazy(() => import("@/components/Card/Card"));
const Menu = lazy(() => import("@/components/Menu/Menu"));
const Splitter = lazy(() => import("@/components/Splitter/Splitter"));
const Tooltip = lazy(() => import("@/components/Tooltip/Tooltip"));
const Toast = lazy(() => import("@/components/Toast/Toast"));
const Camera = lazy(() => import("@/components/Camera/Camera"));
const Logo = lazy(() => import("@/components/Logo/Logo"));
const Gizmo = lazy(() => import("@/components/Gizmos/ScreenGizmo/ScreenGizmo"));
const Viewport = lazy(() => import("@/components/Viewport/Viewport"));

function App() {
  const [entities, setEntities] = useState<EntityDeclaration[]>([]);
  const [selected, setSelected] = useState<EntityDeclaration | null>(null);

  const add = useCallback((entity: EntityType) => {
    const entityWithId: EntityDeclaration = {
      ...entity,
      id: nanoid(),
      name: entity.shape,
      props: { ...entity.props },
    };
    setEntities((prev) => [...prev, entityWithId]);
    setSelected(entityWithId);
  }, []);

  const update = useCallback(
    (id: string, props: MustDeclare<Record<string, unknown>>) => {
      setEntities((prev) =>
        prev.map((entity) =>
          entity.id === id
            ? {
                ...entity,
                props: { ...entity.props, ...props },
              }
            : entity,
        ),
      );
    },
    [],
  );

  const sceneContext = useMemo(
    () => ({
      selected,
      select: setSelected,
      update,
    }),
    [selected, update],
  );

  return (
    <Suspense fallback={<Loading />}>
      <Tooltip />
      <Toast>
        <Camera>
          <SceneContext.Provider value={sceneContext}>
            <Viewport entities={entities}>
              <Bar>
                <Logo />
                <Splitter />
                {Entities.map((entity) => {
                  const Icon = Shapes[entity.shape];
                  return (
                    <Button
                      key={entity.shape}
                      onClick={() => add(entity)}
                      {...tooltip(entity.shape)}
                    >
                      <Icon />
                    </Button>
                  );
                })}
                <Splitter />
                <Menu
                  buttonContent={<BiSolidCameraMovie />}
                  {...tooltip("Camera Settings")}
                >
                  <MenuItem>Reset Camera</MenuItem>
                </Menu>
              </Bar>
              <Gizmo />
              <Card position="left"></Card>
              <Card position="right"></Card>
            </Viewport>
          </SceneContext.Provider>
        </Camera>
      </Toast>
    </Suspense>
  );
}

export default App;
