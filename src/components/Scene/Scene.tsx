import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoBugSharp } from "react-icons/io5";
import Axis from "@/components/Axis/Axis";
import Bar from "@/components/Bar/Bar";
import Link from "@/components/Button/Link";
import Camera from "@/components/Camera/Camera";
import Card from "@/components/Card/Card";
import Properties from "@/components/Properties/Properties";
import useToast from "@/components/Toast/useToast";
import Tooltip from "@/components/Tooltip/Tooltip";
import TreeView from "@/components/TreeView/TreeView";
import Viewport from "@/components/Viewport/Viewport";
import InstanceType from "@/types/InstanceType";
import ObjectType from "@/types/ObjectType";
import ToolType from "@/types/ToolType";
import tooltip from "@/utils/tooltip";
import SceneContext from "./SceneContext";

const Scene = () => {
  const toast = useToast();
  const [tool, setTool] = useState(ToolType.Select);
  const [paintColor, setPaintColor] = useState("#E62");
  const [objects, setObjects] = useState<InstanceType[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
      const newProps = { ...instance.props, ...props };
      setObjects((prev) => {
        const originalInstanceIndex = prev.findIndex(
          (obj) => obj.id === instance.id,
        );
        prev.splice(originalInstanceIndex, 1);
        prev.splice(originalInstanceIndex, 0, {...instance, props: newProps});

        return [...prev];
      });
    },
    [],
  );

  const select = useCallback(
    (instance: InstanceType | null) => {
      if (tool === ToolType.Select) setSelectedId(instance?.id ?? null);
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

  const disableKey = useCallback(
    (e: React.KeyboardEvent) => {
      e.stopPropagation();
    },
    [setTool],
  );

  const selected = useMemo(
    () => objects.find((obj) => obj.id === selectedId) ?? null,
    [objects, selectedId],
  );

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
      setObjects,
      setTool,
      setPaintColor,
    }),
    [
      objects,
      selectedId,
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
          {selectedId != null && (
            <Card position="right" onKeyDown={disableKey}>
              <Properties />
            </Card>
          )}
        </Viewport>
      </SceneContext.Provider>
    </Camera>
  );
};

export default Scene;
