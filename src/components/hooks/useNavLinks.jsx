import Link from "next/link";
import { useRouter } from "next/router";

const useNavLinks = () => {
  const router = useRouter();

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
            ${router.pathname === href ? "bg-white text-yellow-200" : "hover:text-yellow-200"}`}
        >
          {label}
        </Link>
      ))}
    </section>
  );
};

export default useNavLinks;
