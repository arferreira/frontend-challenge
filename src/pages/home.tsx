import { useSession } from "next-auth/react";
import React, { type ReactElement } from "react";
import Button from "~/components/Button";
import HomeSkeleton from "~/components/Skeletons/HomeSkeleton";
import MainLayout from "~/layouts/MainLayout";
import { api } from "~/utils/api";

export default function Home() {
  const { data } = useSession();

  const { mutate, isLoading } = api.user.changeRole.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  if (isLoading) return <HomeSkeleton />;

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="p-4 pb-0">
        <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white-soft md:text-2xl">
          Home
        </h2>
        <p className="text-black dark:text-white-soft">
          You&apos;re a{" "}
          {data?.user.role === "USER"
            ? "User, you cannot access dashboard."
            : "Admin, you can access dashboard."}
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 rounded-b-lg bg-white-soft p-4 dark:bg-black-softest">
        <Button onClick={() => mutate()}>
          Turn yourself into an {data?.user.role === "USER" ? "Admin" : "User"}
        </Button>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
