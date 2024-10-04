import Link from "next/link";

const Header =
  () => {
    return (
      <header
        className="flex items-center justify-between bg-black1 
    text-white h-14"
      >
        <Link
          href={
            "/"
          }
          className="font-semibold text-3xl pl-4"
        >
          <span>
            AppleStore
          </span>
        </Link>
        <nav
          className="pl-4 flex items-center 
        justify-between gap-6 pr-4"
        >
          <Link
            href="/signup"
            className="px-1 py-1 rounded
            text-xl font-semibold border "
          >
            Sign
            Up
          </Link>
          <Link
            href="/login"
            className="bg-white text-black1 px-1 py-1 rounded
            text-xl font-semibold border border-white"
          >
            Login
          </Link>
        </nav>
        {/* <nav>
            <section>
            <Link href='/'>Home</Link>
            <Link href='/cart'>Cart</Link>
            <Link href='/'>About</Link>
            </section>
            <section>
                <span>Name</span>
                <button type="button">Logout</button>
            </section>
        </nav> */}
      </header>
    );
  };
export default Header;
