import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import clsx from "clsx";
import ToastContext from "./ToastContext";
import styles from "./Toast.module.css";

const TOAST_DURATION = 3000;

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
    }, TOAST_DURATION);
  }, []);

  const notify = useCallback(
    (message: string, manualDismiss = false) => {
      toast({ message, manualDismiss, type: "info" });
    },
    [toast]
  );

  const success = useCallback(
    (message: string, manualDismiss = false) => {
      toast({ message, manualDismiss, type: "success" });
    },
    [toast]
  );

  const error = useCallback(
    (message: Error | string, manualDismiss = false) => {
      toast({
        message: message instanceof Error ? message.message : message,
        manualDismiss,
        type: "error",
      });
    },
    [toast]
  );

  const toastContext = useMemo(
    () => ({
      notify,
      success,
      error,
    }),
    [notify, success, error]
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
