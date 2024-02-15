import React from "react";
import { useToast } from "~/providers/ToastProvider";
import { handleMessage, selectIcon } from "~/utils/toast";

export interface ToastProps {
  id: string;
  type: "success" | "danger" | "warning";
  message: string | string[];
}

export default function Toast({ id, type, message }: ToastProps) {
  const { hideToast } = useToast();

  return (
    <div
      id={id ?? `toast-${type}`}
      className="dark:ring-black-softest fixed right-4 top-6 mb-4 flex w-full max-w-[280px] translate-x--96 animate-come-from-right items-center rounded-lg bg-white p-4 text-gray-500 shadow transition-all dark:bg-black-soft dark:text-gray-400 dark:ring-1 md:max-w-sm"
      role="alert"
    >
      {selectIcon(type)}
      <div className="ms-3 text-sm font-normal">{handleMessage(message)}</div>
      <button
        type="button"
        onClick={() => hideToast(id)}
        className="dark:hover:bg-black-softest -mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-black-soft dark:text-gray-500 dark:hover:text-white"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
