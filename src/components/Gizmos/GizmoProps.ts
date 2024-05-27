import { ActionType } from "@/constants/Actions";
import Vector3Type from "@/types/Vector3Type";

interface GizmoProps {
  position: Vector3Type;
  action: ActionType | null;
  onAction: (action: ActionType) => void;
}

export default GizmoProps;
