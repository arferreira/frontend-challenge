import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  header?: boolean;
  children: React.ReactNode;
};

export default function MainLayout({ children, header = false }: Props) {
  // const { data } = useSession();

  return (
    <>
      {header ?? (
        <header className="fixed h-20 w-full bg-white shadow"></header>
      )}
      <main
        className={`flex w-full justify-center bg-background p-4 ${header ? "pt-28" : "pt-10"} `}
      >
        <div className="w-full max-w-md rounded-lg bg-white p-4 shadow">
          {children}
        </div>
      </main>
    </>
  );
}
