"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errpr, setError] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setUserCreated(true);
        setEmail("");
        setPassword("");
      } else {
        const data = await res.json();
        setError(data.message || "Error creating user");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full">
      <h1 className="font-semibold text-4xl text-center pt-16">
        Log In
      </h1>
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
        />
        <input
          type="password"
          placeholder="Password"
          disabled={loading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Log In
        </button>
        <div className="my-4 text-center text-gray-500">
          or Log In with provider
        </div>
        <button
          type="button"
          //   onClick={() => signIn('google', {callbackUrl:'/'})}
          className="flex gap-4 justify-center  bg-white 
          text-black w-full rounded-3xl p-2 text-xl border border-gray-300"
        >
          <Image
            src="/google.png"
            alt="Google Icon"
            width={24}
            height={24}
            className="h-auto w-auto"
          />
          Sign In with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Not registered yet{" "}
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
