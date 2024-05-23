import VectorType from "./VectorType";

type GizmoArrow = {
  color: string;
  direction: VectorType;
  rotation?: Partial<VectorType>;
};

export default GizmoArrow;
