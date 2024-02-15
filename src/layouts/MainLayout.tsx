import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { DarkThemeToggle, ThemeModeScript } from "flowbite-react";
import Link from "next/link";
import Avatar from "~/components/Avatar";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { data } = useSession();
  const user = data?.user;

  return (
    <>
      <Head>
        <title>Frontend Challenge</title>
        <meta
          name="description"
          content="Frontend Challenge made by Gabriel Santana"
        />
        <link rel="icon" href="/favicon.ico" />
        <ThemeModeScript />
      </Head>
      <header className="fixed flex w-full items-center justify-between bg-white p-4 shadow transition-all dark:bg-black-soft">
        <Link href={data ? "/home" : "/"}>
          <h1 className="dark:text-white-soft text-2xl font-extrabold tracking-tight text-black sm:text-3xl md:text-4xl">
            Frontend{" "}
            <span className="text-blue-600 dark:text-discord">Challenge</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <DarkThemeToggle />
          {!!user?.name && !!user?.email ? (
            <Avatar name={user.name} email={user.email} src={user?.image} />
          ) : null}
        </div>
      </header>
      <main className="dark:bg-black-softer flex h-screen w-full flex-col items-center gap-4 bg-background p-4 pt-28">
        <div className="w-full max-w-md rounded-lg bg-white shadow dark:bg-black-soft">
          {children}
        </div>
      </main>
    </>
  );
}
