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
  showToast: (toast: ToastProps) => void;
  // hideToast: (toastId: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = ({ message, type }: ToastProps) => {
    const toastId = Date.now().toString(); // Generate a unique ID
    const newToast = { id: toastId, message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  // const hideToast = (toastId: string) => {
  //   setToasts((prevToasts) =>
  //     prevToasts.filter((toast) => toast.id !== toastId),
  // );
  // };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
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
