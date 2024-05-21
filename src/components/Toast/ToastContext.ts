import { createContext } from "react";

interface ToastContextType {
  notify: (message: string, manualDismiss?: boolean) => void;
  success: (message: string, manualDismiss?: boolean) => void;
  error: (message: Error | string, manualDismiss?: boolean) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export default ToastContext;
