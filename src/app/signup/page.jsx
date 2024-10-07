"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCreatingUser(true);
    setError(""); // Reset error state
    try {
      const res = await fetch("/api/register", {
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
      setCreatingUser(false);
    }
  };

  return (
    <section className="min-h-screen w-full">
      <h1 className="font-semibold text-4xl text-center pt-16">Sign Up</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created.
          <br />
          Now you can{" "}
          <Link className="underline text-orange-500" href={"/login"}>
            Log In &raquo;
          </Link>
        </div>
      )}

      {error && (
        <div className="my-4 text-center text-red-500">
          {error}
        </div>
      )}

      <form
        className="flex flex-col gap-4 items-center 
        justify-center h-full max-w-md mx-auto mt-8"
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
          className="disabled:bg-gray-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
          className="disabled:bg-gray-300"
        />
        <button
          type="submit"
          disabled={creatingUser}
          className="bg-orange-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
        >
          {creatingUser ? "Creating..." : "Sign Up"}
        </button>
        <div className="my-4 text-center text-gray-500">or Sign In with provider</div>
        <button
          type="button"
          className="flex gap-4 justify-center bg-white 
          text-black w-full rounded-3xl p-2 text-xl border border-gray-300"
        >
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Sign In with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline text-orange-500" href={"/login"}>
            Log In here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
