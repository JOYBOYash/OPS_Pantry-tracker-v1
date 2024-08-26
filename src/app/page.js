import Image from "next/image";
import Link from "next/link";
import NextAuth from "next-auth/next";
import "./globals.css";
import "@/app/queries.css";

export default function Landing() {
  return (
    <main className=" main-cnt flex flex-col min-h-screen items-center justify-between bg-gray-800 gap-10 p-96">
      <h1 className="heading text-3xl text-sky-300 drop-shadow-lg">
        Welcome to "
        <span className="text-indigo-100 underline-offset-8 underline">
          Pantrack
        </span>
        " !
      </h1>
      <section className=" cnt flex items-center gap-10 rounded-lg bg-gray-700 border-4 p-12">
        <div className="border-1 transition ease-in-out hover:border-2  hover:border-indigo-900 flex flex-col bg-indigo-600 rounded-lg items-center gap-2 p-4">
          {" "}
          <h2> Already a User ? </h2>
          <Link
            href="/pages/signin"
            className="bg-indigo-400 flex items-center p-2 gap-2 transition ease-in-out hover:border-2  hover:border-indigo-900 w-32 justify-center p-2 w-24 hover:bg-sky-600 hover:outline-2 hover:text-indigo-200  text-center text-indigo-900 text-bold text-xl"
          >
            {" "}
            Login{" "}
            <img
              src="./old.svg"
              alt="Shopping_Cart"
              className="rounded-md w-6"
            ></img>
          </Link>{" "}
        </div>

        <div className="border-1 flex flex-col items-center transition ease-in-out hover:border-2  hover:border-indigo-900 bg-indigo-600 rounded-lg gap-2 p-4">
          {" "}
          <h2> New to the App ? </h2>
          <Link
            href="/pages/signup"
            className="bg-indigo-400 transition ease-in-out hover:border-2  hover:border-indigo-900 flex items-center p-2 w-32 justify-center gap-2 hover:bg-sky-600 hover:outline-2 hover:outline-sky-300 hover:text-indigo-200  text-center  text-indigo-900 text-bold text-xl"
          >
            {" "}
            Sign Up{" "}
            <img
              src="./new.svg"
              alt="Shopping_Cart"
              className="rounded-md w-6"
            ></img>
          </Link>{" "}
        </div>
      </section>
    </main>
  );
}
