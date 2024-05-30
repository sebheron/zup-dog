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
import useToast from "../Toast/useToast";
import SceneContext from "./SceneContext";

const Scene = () => {
  const toast = useToast();
  const [objects, setObjects] = useState<InstanceType[]>([]);
  const [selected, setSelected] = useState<InstanceType | null>(null);

  const update = useCallback(
    (instance: InstanceType, props: Record<string, unknown>) => {
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

  const filter = useCallback((prev: InstanceType[], instance: InstanceType) => {
    return prev
      .filter((obj) => instance.id !== obj.id)
      .map((obj) => {
        if (obj.children) obj.children = filter(obj.children, instance);
        return obj;
      });
  }, []);

  const del = useCallback(
    (instance: InstanceType) => {
      setObjects((prev) => filter(prev, instance));
      toast.notify(`${instance.name} deleted`);
      select(null);
    },
    [filter, select, toast],
  );

  const sceneContext = useMemo(
    () => ({
      objects,
      selected,
      update,
      add,
      select,
      del,
    }),
    [objects, selected, update, add, select, del],
  );

  return (
    <Camera>
      <Tooltip />
      <SceneContext.Provider value={sceneContext}>
        <Viewport>
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
