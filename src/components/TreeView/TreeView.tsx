import clsx from "clsx";
import { useState } from "react";
import { Tree } from "react-arborist";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdChevronRight, MdKeyboardArrowDown } from "react-icons/md";
import useResizeObserver from "use-resize-observer";
import useScene from "@/components/Scene/useScene";
import Icons from "@/constants/Icons";
import ToolType from "@/types/ToolType";
import styles from "./TreeView.module.css";

const TreeView = () => {
  const { ref, height } = useResizeObserver();
  const { tool, selected, objects, update, select, move, rename, setTool } =
    useScene();
  const [search, setSearch] = useState("");

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search..."
        className={clsx(styles.input, styles.search)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.tree} ref={ref}>
        <Tree
          width="100%"
          height={height}
          data={objects}
          rowHeight={35}
          searchTerm={search}
          searchMatch={(node, term) =>
            node.data.name.toLowerCase().includes(term.toLowerCase())
          }
          onRename={({ node, name }) => rename(node.data, name)}
          onMove={({ dragNodes, parentNode }) =>
            move(
              dragNodes.map(({ data }) => data),
              parentNode?.data,
            )
          }
          disableMultiSelection
        >
          {({ node, dragHandle }) => {
            const Icon = Icons[node.data.shape];
            return (
              <div
                className={clsx(styles.node, {
                  [styles.selected]: node.data.id === selected?.id,
                })}
                style={{ paddingLeft: node.level * 22 + 15 }}
                ref={dragHandle}
                onClick={() => {
                  if (tool === ToolType.Paint) setTool(ToolType.Select);
                  else select(node.data);
                }}
              >
                {node.data.children?.length ? (
                  <button
                    className={styles.button}
                    onClick={() => node.toggle()}
                  >
                    {node.isOpen ? (
                      <MdKeyboardArrowDown className={styles.chevron} />
                    ) : (
                      <MdChevronRight className={styles.chevron} />
                    )}
                  </button>
                ) : (
                  <div className={styles.placeholder} />
                )}
                <Icon size={12} className={styles.icon} />
                {!node.isEditing ? (
                  <span
                    className={styles.text}
                    onDoubleClick={() => node.edit()}
                  >
                    {node.data.name}
                  </span>
                ) : (
                  <input
                    type="text"
                    className={styles.input}
                    defaultValue={node.data.name}
                    onBlur={(e) => node.submit(e.target.value)}
                    autoFocus
                  />
                )}
                <button
                  className={styles.visibility}
                  onClick={() =>
                    update(node.data, { visible: !node.data.props.visible })
                  }
                >
                  {node.data.props.visible ? <IoMdEye /> : <IoMdEyeOff />}
                </button>
              </div>
            );
          }}
        </Tree>
      </div>
    </div>
  );
};

export default TreeView;
