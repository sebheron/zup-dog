import { nanoid } from "nanoid";
import { Suspense, lazy, useCallback, useMemo, useState } from "react";
import Loading from "@/components/Loading/Loading";
import SceneContext from "@/components/Scene/SceneContext";
import EntityDeclaration from "@/types/EntityDeclaration";
import EntityType from "@/types/EntityType";
import MustDeclare from "@/types/MustDeclare";

const Bar = lazy(() => import("@/components/Bar/Bar"));
const Card = lazy(() => import("@/components/Card/Card"));
const Tooltip = lazy(() => import("@/components/Tooltip/Tooltip"));
const Toast = lazy(() => import("@/components/Toast/Toast"));
const Camera = lazy(() => import("@/components/Camera/Camera"));
const ScreenGizmo = lazy(() => import("@/components/ScreenGizmo/ScreenGizmo"));
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
      add,
    }),
    [selected, update, add],
  );

  return (
    <Suspense fallback={<Loading />}>
      <Tooltip />
      <Toast>
        <Camera>
          <SceneContext.Provider value={sceneContext}>
            <Viewport entities={entities}>
              <Bar />
              <ScreenGizmo />
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
