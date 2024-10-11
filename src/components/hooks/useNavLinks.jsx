"use client"; 
import Link from "next/link";

const NavLinks = ({ currentPath }) => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/cart", label: "Cart" },
    { href: "/about", label: "About" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <section className="flex gap-4">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`px-1 py-1 rounded text-xl font-semibold 
            ${currentPath === href ? "bg-gray-200 text-black hover:text-red-500" : "hover:text-yellow-200"}`}
        >
          {label}
        </Link>
      ))}
    </section>
  );
};

export default NavLinks;


