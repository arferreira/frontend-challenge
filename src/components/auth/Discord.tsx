import React from "react";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Discord() {
  const { query } = useRouter();

  return (
    <button
      className="dark:bg-black-softest ring-white-softer flex w-full items-center justify-center gap-3 rounded-md bg-white py-2 font-bold text-black-soft ring-1 transition-all hover:scale-[1.02] hover:bg-gray-100 dark:ring-0"
      onClick={() =>
        signIn("discord", {
          callbackUrl:
            (query?.callbackUrl as string) ?? process.env.NEXT_PUBLIC_BASE_URL,
        })
      }
    >
      <div className="rounded-full bg-discord p-1.5 text-white">
        <FaDiscord size={20} />
      </div>
      <p className="dark:text-white-soft text-black">Sign In with Discord</p>
    </button>
  );
}
