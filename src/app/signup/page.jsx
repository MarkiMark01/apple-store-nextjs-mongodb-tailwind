import Image from "next/image";
import Link from "next/link";

const SignUp =
  () => {
    return (
      <section className="min-h-screen w-full">
        <h1 className="font-semibold text-4xl text-center pt-16">
          Sign
          Up
        </h1>
        <div className="my-4 text-center">
          User created.<br />
          Now you can{' '}
          <Link className="underline text-orange-500" href={'/login'}>Login &raquo;</Link>
        </div>
        <form className="flex flex-col gap-4 items-center justify-center h-full max-w-md mx-auto mt-8">
          <input
            type="email"
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Password"
          />
          <button type="submit">
            Sign
            Up
          </button>
          <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
        type="button"
        //   onClick={() => signIn('google', {callbackUrl:'/'})}
          className="flex gap-4 justify-center  bg-white 
          text-black w-full rounded-3xl p-2 text-xl border border-gray-300">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{' '}
          <Link className="underline text-orange-500" href={'/login'}>Login here &raquo;</Link>
        </div>
        </form>
      </section>
    );
  };
export default SignUp;
