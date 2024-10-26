"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useAuth from "../../components/hooks/useAuth";

const SignUp = () => {
  const {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleFormSubmit,
    handleGoogleLogin,
    handleGitHubLogin,
  } = useAuth(false); 

  useEffect(() => {
    document.title = "AppleStore | Sign Up";
  }, []);

  return (
    <section className="min-h-screen w-full">
      <h1 className="font-semibold text-4xl text-center pt-16">Sign Up</h1>

      {error && <div className="my-4 text-center text-red-500">{error}</div>}

      <form
        className="flex flex-col gap-4 items-center justify-center h-full max-w-md mx-auto mt-8 form"
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="text-white py-2 px-4 rounded-lg w-full disabled:opacity-50 hover:bg-gray-800"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <div className="my-4 text-center text-gray-500">or Sign In with provider</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex gap-4 justify-center items-center bg-white text-black w-full rounded-3xl p-2 text-xl border border-gray-300 hover:bg-gray-50"
        >
          <Image src="/google.png" alt="Google Icon" width={24} height={24} className="h-auto w-auto" />
          Sign In with Google
        </button>
        <button
          type="button"
          onClick={handleGitHubLogin}
          className="flex gap-4 justify-center items-center bg-white text-black w-full rounded-3xl p-2 text-xl border border-gray-300 hover:bg-gray-50"
        >
          <Image
            src="/github.png"
            alt="GitHub Icon"
            width={24}
            height={24}
            className="h-auto w-auto"
          />
          Sign In with GitHub
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline text-orange-500" href="/login">
            Log In here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
