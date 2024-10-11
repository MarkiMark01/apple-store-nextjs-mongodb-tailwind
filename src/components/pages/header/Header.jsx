"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'; 

import NavLinks from '../../hooks/useNavLinks';
import LogoutItems from './LogoutItems';

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
          <LogoutItems userName={userName}/>
        </nav>
      )}
    </header>
  );
};

export default Header;
