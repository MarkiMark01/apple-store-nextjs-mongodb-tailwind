"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession(); // Додано "data:"

  return (
    <header className="flex items-center justify-between bg-black1 text-white h-14">
      <Link href={"/"} className="font-semibold text-3xl pl-4">
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
        <nav>
          <section>
            <Link href="/">Home</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/">About</Link>
          </section>
          <section>
            <span>{session.user.name}</span> {/* Покажіть ім'я користувача */}
            <button type="button" onClick={() => signOut()}>
              Logout
            </button>
          </section>
        </nav>
      )}
    </header>
  );
};

export default Header;

