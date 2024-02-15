import React, {
  createContext,
  useContext,
  type ReactNode,
  useState,
} from "react";
import Toast, { type ToastProps } from "~/components/Toast";

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastContextType {
  showToast: (toast: {
    type: "danger" | "success" | "warning";
    message: string;
  }) => void;
  hideToast: (toastId: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = ({
    message,
    type,
  }: {
    type: "danger" | "success" | "warning";
    message: string;
  }) => {
    const toastId = Date.now().toString(); // Generate a unique ID
    const newToast = { id: toastId, message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const hideToast = (toastId: string) => {
    const toast = document.getElementById(toastId);
    if (toast) toast.classList.add("translate-x-[110%]");
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== toastId),
      );
    }, 500);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export { ToastProvider, useToast };
