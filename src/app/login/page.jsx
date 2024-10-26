"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useAuth from "../../components/hooks/useAuth";

const Login = () => {
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
  } = useAuth(true);

  useEffect(() => {
    document.title = "AppleStore | Log In";
  }, []);

  return (
    <section className="min-h-screen w-full">
      <h1 className="font-semibold text-4xl text-center pt-16">
        Log In
      </h1>

      <form
        className="flex flex-col gap-4 items-center justify-center h-full max-w-md mx-auto mt-8 form"
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          disabled={loading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-red-500">{error}</div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Log In"}
        </button>

        <div className="my-4 text-center text-gray-500">
          or Log In with provider
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex gap-4 justify-center items-center bg-white text-black w-full rounded-3xl p-2 text-xl border border-gray-300 hover:bg-gray-50"
        >
          <Image
            src="/google.png"
            alt="Google Icon"
            width={24}
            height={24}
            className="h-auto w-auto"
          />
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
          Not registered yet?{" "}
          <Link
            className="underline text-orange-500"
            href={"/signup"}
          >
            Sign Up here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
