import { nanoid } from "nanoid";
import { Suspense, lazy, useCallback, useMemo, useState } from "react";
import Loading from "@/components/Loading/Loading";
import SceneContext from "@/components/Scene/SceneContext";
import ObjectInstance from "@/types/ObjectInstance";
import ObjectType from "@/types/ObjectType";
import MustDeclare from "@/types/utility/MustDeclare";

const Bar = lazy(() => import("@/components/Bar/Bar"));
const Card = lazy(() => import("@/components/Card/Card"));
const Tooltip = lazy(() => import("@/components/Tooltip/Tooltip"));
const Toast = lazy(() => import("@/components/Toast/Toast"));
const Camera = lazy(() => import("@/components/Camera/Camera"));
const ScreenGizmo = lazy(() => import("@/components/ScreenGizmo/ScreenGizmo"));
const Viewport = lazy(() => import("@/components/Viewport/Viewport"));

function App() {
  const [objects, setObjects] = useState<ObjectInstance[]>([]);
  const [selected, setSelected] = useState<ObjectInstance | null>(null);

  const add = useCallback((obj: ObjectType) => {
    const objWithId: ObjectInstance = {
      ...obj,
      id: nanoid(),
      name: obj.shape,
      props: { ...obj.props },
    };
    setObjects((prev) => [...prev, objWithId]);
    setSelected(objWithId);
  }, []);

  const update = useCallback(
    (id: string, props: MustDeclare<Record<string, unknown>>) => {
      setObjects((prev) =>
        prev.map((obj) =>
          obj.id === id
            ? {
                ...obj,
                props: { ...obj.props, ...props },
              }
            : obj,
        ),
      );
    },
    [],
  );

  const sceneContext = useMemo(
    () => ({
      selected,
      update,
      add,
      select: setSelected,
    }),
    [selected, update, add],
  );

  return (
    <Suspense fallback={<Loading />}>
      <Tooltip />
      <Toast>
        <Camera>
          <SceneContext.Provider value={sceneContext}>
            <Viewport objects={objects}>
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
