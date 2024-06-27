import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoBugSharp } from "react-icons/io5";
import Axis from "@/components/Axis/Axis";
import Bar from "@/components/Bar/Bar";
import Link from "@/components/Button/Link";
import Camera from "@/components/Camera/Camera";
import Card from "@/components/Card/Card";
import useToast from "@/components/Toast/useToast";
import Tooltip from "@/components/Tooltip/Tooltip";
import TreeView from "@/components/TreeView/TreeView";
import Viewport from "@/components/Viewport/Viewport";
import InstanceType from "@/types/InstanceType";
import ObjectType from "@/types/ObjectType";
import ToolType from "@/types/ToolType";
import tooltip from "@/utils/tooltip";
import Properties from "../Properties/Properties";
import SceneContext from "./SceneContext";

const Scene = () => {
  const toast = useToast();
  const [tool, setTool] = useState(ToolType.Select);
  const [paintColor, setPaintColor] = useState("#E62");
  const [objects, setObjects] = useState<InstanceType[]>([]);
  const [selected, setSelected] = useState<InstanceType | null>(null);

  const count = useCallback((instances: InstanceType[]): number => {
    return instances.reduce((acc, obj) => {
      if (obj.children) acc += count(obj.children);
      return acc + 1;
    }, 0);
  }, []);

  const filter = useCallback((prev: InstanceType[], ids: string[]) => {
    return prev
      .filter((obj) => !ids.includes(obj.id))
      .map((obj) => {
        if (obj.children) obj.children = filter(obj.children, ids);
        return obj;
      });
  }, []);

  const update = useCallback(
    (instance: InstanceType, props: Record<string, unknown>) => {
      instance.props = { ...instance.props, ...props };
      setObjects((prev) => [...prev]);
    },
    [],
  );

  const select = useCallback(
    (instance: InstanceType | null) => {
      if (tool === ToolType.Select) setSelected(instance);
      if (tool === ToolType.Paint && instance != null) {
        update(instance, { color: paintColor });
      }
    },
    [tool, paintColor, update],
  );

  const add = useCallback(
    (obj: ObjectType, parent: InstanceType | null = null) => {
      const newProps = { ...obj.props };
      if (newProps.color) newProps.color = paintColor;

      const instance: InstanceType = {
        ...obj,
        id: nanoid(),
        name: obj.shape,
        props: newProps,
        parentId: parent?.id,
        children: [],
      };
      setObjects((prev) => {
        const filtered = filter(prev, [instance.id]);
        if (parent) {
          parent.children.push(instance);
          return [...filtered];
        }
        return [...filtered, instance];
      });
      setTool(ToolType.Select);
      select(instance);
    },
    [select, filter, paintColor],
  );

  const del = useCallback(
    (instances: InstanceType[]) => {
      const counted = count(instances);
      console.log(counted);
      setObjects((prev) =>
        filter(
          prev,
          instances.map((obj) => obj.id),
        ),
      );
      toast.notify(`${counted} deleted`);
      select(null);
    },
    [filter, select, count, toast],
  );

  const move = useCallback(
    (instances: InstanceType[], parent?: InstanceType | null) => {
      setObjects((prev) => {
        const filtered = filter(
          prev,
          instances.map((obj) => obj.id),
        );
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(...instances);
          return [...filtered];
        }
        return [...filtered, ...instances];
      });
    },
    [filter],
  );

  const rename = useCallback((instance: InstanceType, name: string) => {
    instance.name = name;
    setObjects((prev) => [...prev]);
  }, []);

  const sceneContext = useMemo(
    () => ({
      objects,
      selected,
      tool,
      paintColor,
      update,
      add,
      select,
      del,
      move,
      rename,
      setTool,
      setPaintColor,
    }),
    [
      objects,
      selected,
      tool,
      paintColor,
      update,
      add,
      select,
      del,
      move,
      rename,
    ],
  );

  return (
    <Camera>
      <Tooltip />
      <SceneContext.Provider value={sceneContext}>
        <Viewport>
          <Bar />
          <Axis />
          <Card position="left">
            <TreeView />
            <Card.Footer>
              <Link
                href="https://github.com/sebheron/zup-dog"
                {...tooltip("Github")}
              >
                <FaGithub />
              </Link>
              <Link
                href="https://github.com/sebheron/zup-dog/issues"
                {...tooltip("Report an issue")}
              >
                <IoBugSharp />
              </Link>
            </Card.Footer>
          </Card>
          {selected != null && (
            <Card position="right">
              <Properties />
            </Card>
          )}
        </Viewport>
      </SceneContext.Provider>
    </Camera>
  );
};

export default Scene;
