import React from "react";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Discord() {
  const { query } = useRouter();

  return (
    <button
      className="flex w-full items-center justify-center gap-4 rounded-md bg-white py-2 font-bold text-black-soft shadow ring-1 ring-gray-300 transition-all hover:bg-gray-100"
      onClick={() =>
        signIn("discord", {
          callbackUrl:
            (query?.callbackUrl as string) ?? process.env.NEXT_PUBLIC_BASE_URL,
        })
      }
    >
      <div className="rounded-full bg-discord p-1.5 text-white ">
        <FaDiscord size={20} />
      </div>
      Sign In with Discord
    </button>
  );
}
