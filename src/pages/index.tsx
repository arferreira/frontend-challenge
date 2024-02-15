import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type ReactElement, useEffect } from "react";
import Button from "~/components/Button";
import MainLayout from "~/layouts/MainLayout";
import { useToast } from "~/providers/ToastProvider";

export default function Home() {
  const { query } = useRouter();
  const { data: sessionData } = useSession();

  const { showToast } = useToast();

  useEffect(() => {
    if (query?.error) {
      showToast({
        type: "danger",
        message: query.error as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full flex-col items-center p-4 pb-0">
          <h2 className="items- flex gap-2 text-2xl font-bold text-black dark:text-white-softer">
            Welcome!
          </h2>
          <h3 className="text-black dark:text-white-softer">
            {sessionData ? "Hello," : "Please,"}{" "}
            <span className="text-blue-600 dark:text-discord">
              {sessionData ? sessionData.user.name : "Sign in"}
            </span>
          </h3>
        </div>
        <div className="flex w-full items-center justify-center gap-4 px-4 pb-2">
          <Link href="/home">
            <Button>Home</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>

        <div className="flex w-full flex-col gap-4 rounded-b-lg bg-white-soft p-4 dark:bg-black-softest">
          <Button
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </Button>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
