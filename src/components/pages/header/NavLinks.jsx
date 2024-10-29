"use client";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import HomeIcon from "../../icons/HomeIcon";
import CartIcon from "../../icons/CartIcon";
import AboutIcon from "../../icons/AboutIcon";

const NavLinks = ({ currentPath, onClose }) => {
  const { cart } = useCart();

  const links = [
    { href: "/", label: <HomeIcon /> },
    {
      href: "/cart",
      label: (
        <span className="flex items-center relative">
          <CartIcon />
          <span
            className="bg-red-500 text-white rounded-full 
          px-1 text-xs absolute left-6 top-4"
          >
            {cart.length}
          </span>
        </span>
      ),
    },
    { href: "/about", label: <AboutIcon /> },
  ];

  return (
    <section className="flex gap-1 lg:gap-4">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`px-1 py-1 rounded text-lg lg:text-xl lg:font-semibold 
            ${currentPath === href ? "bg-gray-200 text-black hover:text-red-500" : "hover:text-yellow-200"}`}
          onClick={onClose}
        >
          {label}
        </Link>
      ))}
    </section>
  );
};

export default NavLinks;
