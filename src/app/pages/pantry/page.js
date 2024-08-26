"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import AddPantry from "../../components/addPantry";
import ListPantry from "../../components/ListPantry";
import Link from "next/link";

import "@/app/queries.css";

const Pantry = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  if (!user && !userSession) {
    router.push("/");
  }
  return (
    <div className="min-h-screen flex flex-col items-center gap-2 bg-gray-900">
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

      <p className="intro justify-center text-2xl  bg-slate-900 rounded-3xl flex gap-4 shadow-xl p-20 m-20">
        <img
          width={200}
          height={200}
          className="rounded-md p-4"
          src="../pantry.webp"
        />

        <p className="flex flex-col justify-center gap-4 text-left">
          {" "}
          <h1 className="text-sky-500 text-left text-3xl"> Pantry Section</h1>
          Here's where you can manage all the items in your pantry ! <br></br>{" "}
          Feel free to add expiry reminder so that you'll know when your
          products get expired !
        </p>
      </p>

      <section className="section w-full justify-center bg-indigo-900 h-full flex items-center p-20 gap-10  m-4 rounded-md  ">
        <div className="flex flex-col p-4 items-center">
          <h1 className="text-sky-500 text-2xl "> Add to Pantry:</h1>
          <AddPantry />
        </div>
        <ListPantry />
      </section>
    </div>
  );
};

export default Pantry;

// "use client";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../firebase/config";
// import { useRouter } from "next/navigation";
// import { signOut } from "firebase/auth";
// import AddPantry from "../../components/addPantry";
// import ListPantry from "../../components/ListPantry";
// import Link from "next/link";
// import { useEffect } from "react";

// const Pantry = () => {
//   const [user] = useAuthState(auth);
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push("/");
//     }
//   }, [user]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center gap-2 bg-gray-900">
//       <div className="bg-gray-800 h-20 w-full flex items-center justify-between gap-4 p-10 rounded-lg shadow-xl">
//         <div className="logo">
//           <Link href="/pages/homepage">
//             <a className="mainlogo text-sky-500 text-2xl">
//               Pantrack<span className="text-white">.</span>
//             </a>
//           </Link>
//           <p className="logodesc text-white text-xl">
//             Your One-stop inventory system.
//           </p>
//         </div>

//         <div className="nav flex gap-20 items-center">
//           <Link href="/pages/homepage">
//             <a className="home link bg-sky-500 p-2 text-xl">Home</a>
//           </Link>
//           <Link href="/pages/grocery">
//             <a className="link bg-sky-500 p-2 text-xl">Grocery Cart</a>
//           </Link>
//           <Link href="/pages/pantry">
//             <a className="link bg-sky-500 p-2 text-xl">My Pantry</a>
//           </Link>
//           <Link href="/pages/recipes">
//             <a className="link bg-sky-500 p-2 text-xl">My Recipes</a>
//           </Link>
//         </div>

//         <button
//           className="logout link p-2 bg-red-600 text-xl"
//           onClick={() => {
//             signOut(auth).then(() => {
//               router.push("/");
//             });
//           }}
//         >
//           Log-Out
//         </button>
//       </div>

//       <section className="section flex flex-col gap-4 bg-indigo-900 p-10">
//         <h1 className="text-sky-500 text-3xl">Pantry Section</h1>
//         <p>Manage your pantry items and set expiry reminders.</p>
//         <AddPantry />
//         <ListPantry />
//       </section>
//     </div>
//   );
// };

// export default Pantry;
