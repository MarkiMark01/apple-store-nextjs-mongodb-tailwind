import Link from "next/link";

const SignItems = () => {
  return (
    <>
      <Link
        href="/signup"
        className="px-2 py-0.5 rounded text-sm sm:text-lg font-semibold border hover:bg-yellow-200 hover:text-black"
      >
        Sign Up
      </Link>
      <Link
        href="/login"
        className="bg-white text-black1 px-2 py-0.5 rounded text-sm sm:text-lg 
    font-semibold border border-white hover:bg-yellow-200"
      >
        Log In
      </Link>
    </>
  );
};
export default SignItems;
