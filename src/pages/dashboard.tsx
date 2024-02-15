import React, { type ReactElement } from "react";
import MainLayout from "~/layouts/MainLayout";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-start gap-1 p-4">
      <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white-soft md:text-2xl">
        Dashboard
      </h2>
      <p className="text-black dark:text-white-soft">Cool Dashboard</p>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
