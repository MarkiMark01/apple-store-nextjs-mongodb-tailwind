import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] =
    useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'},
    })
  };

  return (
    <section className="min-h-screen w-full">
      <h1 className="font-semibold text-4xl text-center pt-16">
        SignUp
      </h1>
      <div className="my-4 text-center">
        User created.
        <br />
        Now you can{" "}
        <Link
          className="underline text-orange-500"
          href={"/login"}
        >
          Log In &raquo;
        </Link>
      </div>

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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <div className="my-4 text-center text-gray-500">
          or Sign In with provider
        </div>
        <button
          type="button"
          //   onClick={() => signIn('google', {callbackUrl:'/'})}
          className="flex gap-4 justify-center  bg-white 
          text-black w-full rounded-3xl p-2 text-xl border border-gray-300"
        >
          <Image
            src={"/google.png"}
            alt={""}
            width={24}
            height={24}
          />
          Sign In with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link
            className="underline text-orange-500"
            href={"/login"}
          >
            Log In here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};
export default SignUp;
