"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import "@/app/queries.css";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      router.push("/homepage");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex signup m-4 flex-col bg-gray-800 p-10 rounded-lg gap-2 shadow-xl w-96">
        <h1 className="text-black flex items-center gap-2 text-2xl mb-5">
          {" "}
          <img
            src="./old.svg"
            alt="Shopping_Cart"
            className="rounded-md w-6"
          ></img>{" "}
          Sign in
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 hover:scale-105 hover:bg-indigo-600 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 hover:scale-105 hover:bg-indigo-600 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign In
        </button>
        <h1 className="text-white text-xl mb-5">
          New User?{" "}
          <a href="/signup" className="text-sky-500">
            {" "}
            SignUp{" "}
          </a>{" "}
          here.{" "}
        </h1>
      </div>
    </div>
  );
};

export default SignIn;
