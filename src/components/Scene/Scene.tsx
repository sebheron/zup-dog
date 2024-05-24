import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";
import Axis from "@/components/Axis/Axis";
import Bar from "@/components/Bar/Bar";
import Camera from "@/components/Camera/Camera";
import Card from "@/components/Card/Card";
import Tooltip from "@/components/Tooltip/Tooltip";
import Viewport from "@/components/Viewport/Viewport";
import InstanceType from "@/types/InstanceType";
import ObjectType from "@/types/ObjectType";
import MustDeclare from "@/types/utility/MustDeclare";
import useToast from "../Toast/useToast";
import SceneContext from "./SceneContext";

const Scene = () => {
  const toast = useToast();
  const [objects, setObjects] = useState<InstanceType[]>([]);
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
      const objWithId: InstanceType = {
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

  const del = useCallback(
    (ids: string[]) => {
      setObjects((prev) => prev.filter((obj) => !ids.includes(obj.id)));
      toast.notify(`${ids.length} object${ids.length > 1 ? "s" : ""} deleted`);
      select(null);
    },
    [select, toast],
  );

  const sceneContext = useMemo(
    () => ({
      selected,
      update,
      add,
      select,
      del,
    }),
    [selected, update, add, select, del],
  );

  return (
    <Camera>
      <Tooltip />
      <SceneContext.Provider value={sceneContext}>
        <Viewport objects={objects}>
          <Bar />
          <Axis />
          <Card position="left"></Card>
          <Card position="right"></Card>
        </Viewport>
      </SceneContext.Provider>
    </Camera>
  );
};

export default Scene;
