"use client"; 
import Link from "next/link";

import {useCart} from '../context/CartContext';
import HomeIcon from '../../components/icons/HomeIcon';

const NavLinks = ({ currentPath, onClose }) => {
  
  const {cart} = useCart()

  const links = [
    { href: "/", label: <HomeIcon/> },
    { href: "/cart", label:  `Cart (${cart.length})` },
    { href: "/about", label: "About" },
    { href: "/profile", label: "Profile" },
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



