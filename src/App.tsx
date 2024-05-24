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
  const [selected, setSelected] = useState<string[]>([]);

  const update = useCallback(
    (
      ids: string[],
      props: (id: string) => MustDeclare<Record<string, unknown>> | undefined,
    ) => {
      setObjects((prev) =>
        prev.map((obj) => {
          if (!ids.includes(obj.id)) return obj;
          const additionalProps = props(obj.id);
          if (!additionalProps) return obj;
          return {
            ...obj,
            props: { ...obj.props, ...additionalProps },
          };
        }),
      );
    },
    [],
  );

  const select = useCallback(
    (id: string | null, multiSelect: boolean = false) => {
      setSelected((prev) => {
        if (id === null) return [];
        if (prev.includes(id)) return prev.filter((i) => i !== id);
        if (multiSelect) return [...prev, id];
        return [id];
      });
    },
    [],
  );

  const add = useCallback(
    (obj: ObjectType) => {
      const objWithId: ObjectInstance = {
        ...obj,
        id: nanoid(),
        name: obj.shape,
        props: { ...obj.props },
      };
      setObjects((prev) => [...prev, objWithId]);
      select(objWithId.id);
    },
    [select],
  );

  const sceneContext = useMemo(
    () => ({
      selected,
      update,
      add,
      select,
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
