"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useModal } from "../../hooks/useModal"; 

import NavLinks from "./NavLinks";
import LogoutItems from "./LogoutItems";
import SignItems from "./SignItems";
import NavigationItems from "../../modal/NavigationItems";

const Header = () => {
  const { data: session, status } = useSession();
  const currentPath = usePathname();
  const { isOpen, openModal, closeModal } = useModal(); 

  let userName =
    session?.user?.name || session?.user?.email;

  if (userName) {
    const spaceIndex = userName.indexOf(" ");
    const atIndex = userName.indexOf("@");

    if (spaceIndex !== -1) {
      userName = userName.slice(0, spaceIndex);
    } else if (atIndex !== -1) {
      userName = userName.slice(0, atIndex);
    }
  }

  return (
    <header className="flex items-center justify-between bg-black1 text-white h-14 sticky top-0 z-10">
      <Link
        href={"/"}
        className="font-semibold text-xl lg:text-3xl md:text-2xl pl-4"
      >
        <span>AppleStore</span>
      </Link>

      {status === "authenticated" ? (
        <>
          <nav className="hidden sm:flex pl-4 items-center justify-between gap-4 lg:gap-6 pr-4">
            <NavLinks currentPath={currentPath} />
            <span>|</span>
            <LogoutItems userName={userName} />
          </nav>
          <button
            className="flex sm:hidden pr-4 text-xl"
            onClick={openModal} 
          >
            Menu
          </button>
        </>
      ) : (
        <nav className="pl-4 flex items-center justify-between gap-2 sm:gap-6 pr-4">
          <SignItems />
        </nav>
      )}
      {isOpen && (
        <NavigationItems
          isOpen={isOpen}
          onClose={closeModal} 
          userName={userName}
        />
      )}
    </header>
  );
};

export default Header;
