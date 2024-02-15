import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Props = {
  src?: string | null;
  name: string;
  email: string;
};

export default function Avatar({ src, name, email }: Props) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      onClick={() => setDropdownVisible(!dropdownVisible)}
      ref={avatarRef}
      className="cursor-pointer"
    >
      {src ? (
        <Image
          className="cur h-10 w-10 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
          width={40}
          height={40}
          src={src}
          priority
          alt="Bordered avatar"
        />
      ) : (
        <svg
          className="h-8 w-8 rounded-full bg-white p-1 text-white-softest ring-2 ring-white-softer dark:border-gray-500 dark:bg-black dark:text-white-softer"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}

      {dropdownVisible && (
        <div
          id="userDropdown"
          ref={dropdownRef}
          className="absolute right-6 top-16 z-10 w-full max-w-52 animate-come-from-right divide-y divide-white-soft rounded-lg bg-white shadow ring-1 ring-white-softer transition-all dark:divide-black-softest dark:bg-black dark:ring-black-softest"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white-softer">
            <div>{name}</div>
            <div className="truncate font-medium">{email}</div>
          </div>
          <ul
            className="text-sm text-gray-700 dark:text-white-softer"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                href="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-black-softest dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
          </ul>
          <button
            onClick={() => signOut()}
            className="flex w-full items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white-softer dark:hover:bg-black-softest dark:hover:text-white"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );

  //   return (
  //     <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
  //       <svg
  //         className="absolute -left-1 h-12 w-12 text-gray-400"
  //         fill="currentColor"
  //         viewBox="0 0 20 20"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           fillRule="evenodd"
  //           d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
  //           clipRule="evenodd"
  //         ></path>
  //       </svg>
  //     </div>
  //   );
}
