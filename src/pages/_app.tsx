import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { type ReactElement, type ReactNode } from "react";
import { type NextPage } from "next";
import { ToastProvider } from "~/providers/ToastProvider";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: NextPageWithLayout;
  pageProps: { session: Session | null };
}) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <SessionProvider session={session}>
      <ToastProvider>{getLayout(<Component {...pageProps} />)}</ToastProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
