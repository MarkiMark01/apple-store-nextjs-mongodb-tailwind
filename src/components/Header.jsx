"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'; 

import ExitIcon from './icons/ExitIcon';
import NavLinks from './hooks/useNavLinks';

const Header = () => {
  const { data: session, status } = useSession();
  const currentPath = usePathname(); 

  let userName =
    session?.user?.name || session?.user?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header className="flex items-center justify-between bg-black1 text-white h-14">
      <Link
        href={"/"}
        className="font-semibold text-3xl pl-4"
      >
        <span>AppleStore</span>
      </Link>
      <nav className="pl-4 flex items-center justify-between gap-6 pr-4">
        {status === "unauthenticated" && (
          <>
            <Link
              href="/signup"
              className="px-1 py-1 rounded text-xl font-semibold border"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="bg-white text-black1 px-1 py-1 rounded text-xl font-semibold border border-white"
            >
              Log In
            </Link>
          </>
        )}
      </nav>
      {status === "authenticated" && (
        <nav className="pl-4 flex items-center justify-between gap-6 pr-4">
          <NavLinks currentPath={currentPath} />
          <span>|</span>
          <section className="flex items-center">
            <button
              type="button"
              onClick={() => signOut()}
              className="px-1 py-1 rounded text-md border 
              hover:bg-red-600 hover:text-white mr-4"
            >
              <ExitIcon/>
            </button>
            <span className="text-yellow-200 py-1">
              <span className="hidden lg:inline">Hello, </span>
              {userName}
            </span>
          </section>
        </nav>
      )}
    </header>
  );
};

export default Header;
