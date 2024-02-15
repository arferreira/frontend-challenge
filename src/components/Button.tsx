import React, { type ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
}

export default function Button({ children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="dark:hover:bg-discord-dark w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-discord dark:focus:ring-blue-800 sm:w-auto"
    >
      {children}
    </button>
  );
}
