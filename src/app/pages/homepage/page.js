"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import "@/app/queries.css";
import Link from "next/link";

const Homepage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  if (!user && !userSession) {
    router.push("/");
  }

  return (
    <div className="min-h-screen overflow-x-hidden  flex flex-col items-center bg-gray-900">
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

        <div className=" nav flex gap-20 items-center">
          <Link
            href="/pages/homepage"
            className="home hidden link bg-sky-500 hover:shadow-xl w-46 flex transition ease-in-out gap-2 rounded-md hover:rounded-md hover:bg-sky-200 hover:text-indigo-900 p-2 text-xl"
          >
            {" "}
            <img src="../home.svg" className="w-6"></img>
          </Link>

          <Link
            href="/pages/grocery"
            className="link bg-sky-500 hover:shadow-xl w-46 flex transition ease-in-out gap-2 rounded-md hover:rounded-md hover:bg-sky-200 hover:text-indigo-900 p-2 text-xl"
          >
            {" "}
            Grocery Cart <img src="../cart.svg" className="w-6"></img>
          </Link>

          <Link
            href="/pages/pantry"
            className="link bg-sky-500 hover:shadow-xl w-46 hover:rounded-md transition ease-in-out hover:bg-sky-200 hover:text-indigo-900  rounded-md p-2 flex gap-2 text-xl"
          >
            {" "}
            My Pantry <img src="../pantry.svg" className="w-6"></img>
          </Link>

          <Link
            href="/pages/recipes"
            className="link bg-sky-500 hover:shadow-xl w-46 hover:rounded-md transition ease-in-out hover:bg-sky-200 hover:text-indigo-900 rounded-md p-2 flex gap-2 text-xl"
          >
            {" "}
            My Recipes <img src="../recipe.svg" className="w-6"></img>
          </Link>
        </div>

        <button
          className=" logout link flex gap-2 hover:shadow-xl rounded-md transition ease-in-out p-2 bg-red-600 text-xl mb-5 hover:text-black hover:bg-red-900"
          onClick={() => {
            {
              signOut(auth);
              sessionStorage.removeItem("user");
            }
          }}
        >
          Log-Out <img src="../power.svg" className="log w-6"></img>
        </button>
      </div>

      <section className="main h-full flex flex-col gap-32 w-full  m-4 rounded-md ">
        <p className="intro text-center items-center flex flex-col  gap-4 text-2xl bg-slate-900 rounded-3xl shadow-xl p-20 m-20">
          <h1 className=" text-3xl text-center">
            <span className="text-sky-500 text-xxl">Welcome</span> to all in one
            Pantry Solution !{" "}
            <span className="text-sky-500 underline-offset-8 underline">
              Pantrack
            </span>{" "}
            .
          </h1>
          <h1 className="text text-3xl mt-4 text-center">
            {" "}
            Welcome to the all-in-one kitchen management app! Seamlessly manage
            your pantry items, organize grocery shopping carts, and create or
            share fun recipes with ease. Stay on top of your kitchen needs and
            explore creative cooking ideas in one place.{" "}
          </h1>
        </p>
        <div className="features flex gap-20 bg-indigo-900 w-full rounded-lg border-stone-900 shadow-xxl text-center flex-row p-40">
          <div className="w-96 border-4 hover:shadow-2xl transition ease-in-out  hover:scale-105 text-center h-auto flex-col p-10  justify-center h-auto flex items-center gap-10 rounded-t-xl rounded-b-full bg-indigo-600 m-4 ">
            <img
              src="../cart.webp"
              width={300}
              height={300}
              alt="Shopping_Cart"
              className="rounded-full "
            ></img>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-white text-2xl mb-5">
                Manage your Shopping Cart!
              </h1>
              <Link
                href="/pages/grocery"
                className="bg-sky-500 transition ease-in-out w-46 rounded-md hover:rounded-md hover:bg-sky-200 hover:text-indigo-900 p-2 text-white text-xl"
              >
                {" "}
                Go to Cart &larr;{" "}
              </Link>
            </div>
          </div>

          <div className="w-96 border-4 hover:shadow-2xl transition ease-in-out hover:scale-105 text-center h-auto  justify-center flex-col  flex items-center gap-10 rounded-t-xl rounded-b-full bg-indigo-600 p-12 m-4 ">
            <div className="text-center flex-col items-center">
              <img
                src="../pantry.webp"
                width={250}
                height={350}
                alt="Shopping_Cart"
                className="rounded-md"
              ></img>

              <h1 className="text-white text-2xl mb-5">
                Manage your Home Inventory!
              </h1>
              <Link
                href="/pages/pantry"
                className="bg-sky-500 w-46 transition ease-in-out rounded-md hover:rounded-md hover:bg-sky-200 hover:text-indigo-900 p-2 text-white text-xl"
              >
                {" "}
                Go to Pantry &rarr;{" "}
              </Link>
            </div>
          </div>

          <div className="w-96 border-4 hover:shadow-2xl transition ease-in-out hover:scale-105 flex text-center h-auto justify-center flex-col items-center gap-10 rounded-t-xl rounded-b-full bg-indigo-600 p-10 m-4 ">
            <img
              src="../recepies.webp"
              width={300}
              height={300}
              alt="Shopping_Cart"
              className="rounded-md"
            ></img>
            <div>
              <h1 className="text-white text-2xl mb-5">
                Create and share your Fun recipes !
              </h1>
              <Link
                href="/pages/recipes"
                className="bg-sky-500 transition ease-in-out w-46 rounded-md hover:rounded-md hover:bg-sky-200 hover:text-indigo-900 p-2 text-white text-xl"
              >
                {" "}
                Go to Recipes &larr;{" "}
              </Link>
            </div>
          </div>
        </div>

        <p className=" word text-center items-center flex flex-col gap-4 text-2xl bg-slate-900 rounded-3xl shadow-xl p-20 m-20">
          {" "}
          <span className="text-3xl text-sky-800 text-center">
            <q>From the Dev</q>
          </span>{" "}
          <br></br>
          <p>
            {" "}
            The App <span className="text-sky-500 text-3xl">Pantrack</span>, is
            a free-to-use, Micro-SaaS made Open-Source by a solo-dev, <br></br>{" "}
            updates will be rolling in very frequently so watch out for them and
            enjoy using the app! -{" "}
            <span className="text-sm text-slate-700 items-center text-center">
              JoyBoYash
            </span>
          </p>
          <div className="flex gap-4 items-center">
            {" "}
            <Link href="https://www.linkedin.com/in/sri-swaroop-kumar-joyboy/">
              <img
                src="../code.svg"
                className="w-10 bg-indigo-900 rounded-full hover:bg-indigo-500 transition ease-in-out p-2"
              ></img>{" "}
            </Link>
            <Link href="https://www.linkedin.com/in/sri-swaroop-kumar-joyboy/">
              <img
                src="../github.svg"
                className="w-10 bg-indigo-900 rounded-full hover:bg-indigo-500 transition ease-in-out p-2"
              ></img>{" "}
            </Link>
          </div>
        </p>
      </section>
    </div>
  );
};

export default Homepage;
