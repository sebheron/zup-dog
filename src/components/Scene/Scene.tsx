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
  const [selected, setSelected] = useState<InstanceType | null>(null);

  const update = useCallback(
    (instance: InstanceType, props: MustDeclare<Record<string, unknown>>) => {
      instance.props = { ...instance.props, ...props };
      setObjects((prev) => [...prev]);
    },
    [],
  );

  const select = useCallback((instance: InstanceType | null) => {
    setSelected(instance);
  }, []);

  const add = useCallback(
    (obj: ObjectType, parent: InstanceType | null = null) => {
      const objWithId: InstanceType = {
        ...obj,
        id: nanoid(),
        name: obj.shape,
        props: { ...obj.props },
        parentId: parent?.id,
      };
      setObjects((prev) => {
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(objWithId);
          return [...prev];
        }
        return [...prev, objWithId];
      });
      select(objWithId);
    },
    [select],
  );

  const filterIds = useCallback((prev: InstanceType[], ids: string[]) => {
    return prev
      .filter((obj) => !ids.includes(obj.id))
      .map((obj) => {
        if (obj.children) obj.children = filterIds(obj.children, ids);
        return obj;
      });
  }, []);

  const del = useCallback(
    (ids: string[]) => {
      setObjects((prev) => filterIds(prev, ids));
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
