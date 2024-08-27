"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import AddRecepie from "../../components/addRecepie";
import ListRecepie from "../../components/ListRecepie";
import Link from "next/link";
import "@/app/queries.css";
import { useEffect, useState } from "react";

const Recipe = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (!user) {
    router.push("/");
  }

  return (
    <div className="page min-h-screen flex flex-col items-center gap-2 bg-gray-900">
      <div className="bg-gray navbar -800 h-20 w-full flex items-center justify-between gap-4 p-10 rounded-lg shadow-xl w-96">
        <div className="logo">
          <Link href="/pages/homepage">
            <h1 className="mainlogo text-sky-500 text-2xl ">
              Pantrack<span className="text-white">.</span>
            </h1>
          </Link>
          <p className="logodesc text-white text-xl ">
            Your One-stop inventory system.
          </p>
        </div>

        <div className="nav flex gap-20 items-center">
          <Link
            href="/pages/homepage"
            className="home hidden link bg-sky-500 hover:shadow-xl w-46 flex transition ease-in-out gap-2 rounded-md hover:rounded-md hover:bg-sky-200 hover:text-indigo-900 p-2 text-xl"
          >
            <img src="../home.svg" className="w-6"></img>
          </Link>

          <Link
            href="/pages/grocery"
            className="link bg-sky-500 hover:shadow-xl w-46 flex transition ease-in-out gap-2 rounded-md hover:rounded-md hover:bg-sky-200 hover:text-indigo-900 p-2 text-xl"
          >
            Grocery Cart <img src="../cart.svg" className="w-6"></img>
          </Link>

          <Link
            href="/pages/pantry"
            className="link bg-sky-500 hover:shadow-xl w-46 hover:rounded-md transition ease-in-out hover:bg-sky-200 hover:text-indigo-900  rounded-md p-2 flex gap-2 text-xl"
          >
            My Pantry <img src="../pantry.svg" className="w-6"></img>
          </Link>

          <Link
            href="/pages/recipes"
            className="link bg-sky-500 hover:shadow-xl w-46 hover:rounded-md transition ease-in-out hover:bg-sky-200 hover:text-indigo-900 rounded-md p-2 flex gap-2 text-xl"
          >
            My Recipes <img src="../recipe.svg" className="w-6"></img>
          </Link>
        </div>

        <button
          className="logout link flex gap-2 hover:shadow-xl rounded-md transition ease-in-out p-2 bg-red-600 text-xl mb-5 hover:text-black hover:bg-red-900"
          onClick={() => {
            signOut(auth);
          }}
        >
          Log-Out <img src="../power.svg" className="log w-6"></img>
        </button>
      </div>

      <div className="intro justify-center text-2xl bg-slate-900 rounded-3xl flex gap-4 shadow-xl p-20 m-20">
        <img
          width={200}
          height={200}
          className="rounded-md p-4"
          src="../recepies.webp"
        />

        <div className="flex flex-col justify-center gap-4 text-left">
          <h1 className="text-sky-500 text-left text-3xl">Recipes Section</h1>
          Here's where you can come up with crazy and tasty recipes to try out!{" "}
          <br />
          You never know when your next million taste-bud waking recipe idea
          might hit you!
        </div>
      </div>

      <section className="section w-full justify-center bg-indigo-900 h-full flex items-center p-20 gap-10  m-4 rounded-md ">
        <div className="flex flex-col p-4 items-center" text-center>
          <h1 className="text-sky-500 text-2xl">Add New Recipe:</h1>
          <AddRecepie />
        </div>
      </section>
    </div>
  );
};

export default Recipe;
