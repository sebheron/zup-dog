import VectorType from "./VectorType";

type GizmoType = {
  color: string;
  direction: VectorType;
  rotation?: Partial<VectorType>;
};

export default GizmoType;
