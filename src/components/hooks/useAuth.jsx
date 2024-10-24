
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const useAuth = (isLogin = true) => {
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

    if (isLogin) {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res.ok) {
        router.push("/");
      } else {
        setError(res.error);
      }
    } else {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          await signIn("credentials", { email, password, callbackUrl: "/" });
        } else {
          const data = await res.json();
          setError(data.message || "Error creating user");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
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
  const handleGitHubLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signIn("github", { callbackUrl: "/" });
    } catch (error) {
      setError("GitHub login failed.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleFormSubmit,
    handleGoogleLogin,
    handleGitHubLogin
  };
};

export default useAuth;
