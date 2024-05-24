import clsx from "clsx";
import { nanoid } from "nanoid";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import Global from "@/constants/Global";
import styles from "./Toast.module.css";
import ToastContext from "./ToastContext";

interface ToastType {
  id: string;
  message: string;
  manualDismiss: boolean;
  type: "error" | "info" | "success";
}

const Toast = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = useCallback((options: Omit<ToastType, "id">) => {
    const toast = { ...options, id: nanoid() };
    setToasts((prev) => [...prev, toast]);
    if (toast.manualDismiss) return;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, Global.ToastDuration);
  }, []);

  const notify = useCallback(
    (message: string, manualDismiss = false) => {
      toast({ message, manualDismiss, type: "info" });
    },
    [toast],
  );

  const success = useCallback(
    (message: string, manualDismiss = false) => {
      toast({ message, manualDismiss, type: "success" });
    },
    [toast],
  );

  const error = useCallback(
    (message: Error | string, manualDismiss = false) => {
      toast({
        message: message instanceof Error ? message.message : message,
        manualDismiss,
        type: "error",
      });
    },
    [toast],
  );

  const toastContext = useMemo(
    () => ({
      notify,
      success,
      error,
    }),
    [notify, success, error],
  );

  return (
    <ToastContext.Provider value={toastContext}>
      {children}
      <div className={styles.container}>
        {toasts.map(({ message, type, id }, index) => (
          <div
            key={id}
            className={clsx(styles.toast, styles[type])}
            style={{ bottom: `${(toasts.length - 1 - index) * 50}px` }}
          >
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default Toast;
