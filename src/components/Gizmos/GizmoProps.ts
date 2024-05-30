import { ActionType } from "@/constants/Actions";

interface GizmoProps {
  action: ActionType | null;
  onAction: (action: ActionType | null) => void;
}

export default GizmoProps;
