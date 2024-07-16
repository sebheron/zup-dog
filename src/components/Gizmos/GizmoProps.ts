import { ActionType } from "@/constants/Actions";
import Vector3Type from "@/types/Vector3Type";

interface GizmoProps {
  action: ActionType | null;
  onAction: (action: ActionType | null) => void;
  scaling: Vector3Type;
}

export default GizmoProps;
