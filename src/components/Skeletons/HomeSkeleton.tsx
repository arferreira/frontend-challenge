import React from "react";

export default function HomeSkeleton() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col gap-4 p-4 pb-0">
        <div role="status" className="w-full animate-pulse">
          <div className="mb-4 h-4 w-48 rounded-full bg-gray-200 dark:bg-black-softest" />
          <div className="mb-3 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-black-softest" />
        </div>
      </div>
      <div role="status" className="w-full animate-pulse">
        <div className="h-14 w-full rounded-b-lg bg-gray-200 dark:bg-black-softest" />
      </div>
    </div>
  );
}
