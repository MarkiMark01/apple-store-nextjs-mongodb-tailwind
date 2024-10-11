"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

const Login = () => {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      setError("Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full">
      <h1 className="font-semibold text-4xl text-center pt-16">Log In</h1>

      <form
        className="flex flex-col gap-4 items-center justify-center h-full max-w-md mx-auto mt-8"
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          disabled={loading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="text-white rounded p-2 w-full hover:bg-gray-800"
        >
          {loading ? "Loading..." : "Log In"}
        </button>

        <div className="my-4 text-center text-gray-500">or Log In with provider</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex gap-4 justify-center items-center bg-white text-black w-full 
          rounded-3xl p-2 text-xl border border-gray-300 hover:bg-gray-50"
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

        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Not registered yet?{" "}
          <Link className="underline text-orange-500" href={"/signup"}>
            Sign Up here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;



