import Link from "next/link";

const SignItems = () => {
  return (
    <>
      <Link
        href="/signup"
        className="px-2 py-0.5 rounded text-sm sm:text-lg font-semibold border"
      >
        Sign Up
      </Link>
      <Link
        href="/login"
        className="bg-white text-black1 px-2 py-0.5 rounded text-sm sm:text-lg 
    font-semibold border border-white"
      >
        Log In
      </Link>
    </>
  );
};
export default SignItems;
