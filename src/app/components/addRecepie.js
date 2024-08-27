// "use client";
// import { useState } from "react";
// import { collection, addDoc } from "@firebase/firestore";
// import db from "../firebase/firestore";
// import { auth } from "../firebase/config";
// import { useAuthState } from "react-firebase-hooks/auth"; // Hook to get the authenticated user
// import { Roboto } from "next/font/google";

// const roboto = Roboto({ subsets: ["latin"], weight: ["300", "700"] });

// const AddRecepie = () => {
//   const [title, setTitle] = useState("");
//   const [process, setProcess] = useState("");
//   const [items, setItems] = useState("");
//   const [user] = useAuthState(auth); // Get the authenticated user

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (user) {
//       try {
//         const docRef = await addDoc(
//           collection(db, "users", user.uid, "Recipes"), // Add the recipe under the user's specific collection
//           {
//             title: title,
//             process: process,
//             items: items,
//           }
//         );
//         console.log("Recipe added with ID:", docRef.id);
//         // window.location.reload(); // Optional, could be removed for better UX
//         setTitle("");
//         setProcess("");
//         setItems("");
//       } catch (error) {
//         console.log("Error adding the recipe!", error);
//       }
//     } else {
//       console.log("No user authenticated.");
//     }
//   };

//   return (
//     <form
//       className="flex flex-col shadow-xl rounded-md bg-slate-800 border-2 border-slate-700 p-10 gap-4"
//       onSubmit={handleSubmit}
//     >
//       <input
//         className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter Your Recipe Name"
//       />

//       <input
//         className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
//         type="text"
//         value={process}
//         onChange={(e) => setProcess(e.target.value)}
//         placeholder="Enter Cooking Process"
//       />

//       <input
//         className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
//         type="text"
//         value={items}
//         onChange={(e) => setItems(e.target.value)}
//         placeholder="Add all required Items"
//       />
//       <label htmlFor="text" className={roboto.className}>
//         {" "}
//         *seperate items by comma
//       </label>

//       <button
//         className="bg-indigo-900 text-xl flex justify-center items-center gap-2 p-2 hover:shadow-xl rounded-full hover:text-black hover:bg-indigo-600"
//         type="submit"
//       >
//         Add Recipe <img src="../add.svg" className="w-6 "></img>
//       </button>
//     </form>
//   );
// };

// export default AddRecepie;

"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "@firebase/firestore";
import db from "../firebase/firestore";
import { auth } from "../firebase/config"; // Import Firebase config and auth
import { useAuthState } from "react-firebase-hooks/auth"; // Hook to get the authenticated user
import { useRouter } from "next/navigation";
import RDeleteItem from "./RRemoveitem";

import "@/app/queries.css";
const AddRecepie = () => {
  const [title, setTitle] = useState("");
  const [process, setProcess] = useState("");
  const [items, setItems] = useState("");
  const [recipes, setRecipes] = useState([]); // Real-time recipes state
  const [user] = useAuthState(auth); // Get the authenticated user
  const router = useRouter();

  // Fetch recipes in real-time when the user is authenticated
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(db, "users", user.uid, "Recipes"),
        (snapshot) => {
          const newRecipes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRecipes(newRecipes);
        }
      );

      // Clean up the subscription on unmount
      return () => unsubscribe();
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add the recipe to the user's specific "Recipes" collection
      const docRef = await addDoc(
        collection(db, "users", user.uid, "Recipes"),
        {
          title: title,
          process: process,
          items: items,
        }
      );
      console.log("Recipe added with ID:", docRef.id);

      // Clear form fields after submission
      setTitle("");
      setProcess("");
      setItems("");
    } catch (error) {
      console.log("Error adding the recipe!", error);
    }
  };

  return (
    <div className="section flex gap-10 items-center justify-center p-10">
      <form
        className="flex flex-col w-5/6 shadow-xl  rounded-md bg-slate-800 border-2 border-slate-700 p-10 gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Recipe Name"
        />

        <input
          className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
          type="text"
          value={process}
          onChange={(e) => setProcess(e.target.value)}
          placeholder="Enter Cooking Process"
        />

        <input
          className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
          type="text"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          placeholder="Add Required Ingredients"
        />

        <button
          className="bg-indigo-900 flex gap-2 items-center justify-center text-xl p-2 hover:shadow-xl rounded-full hover:text-black hover:bg-indigo-600"
          type="submit"
        >
          Add Recipe <img src="../add.svg" className="w-6 "></img>
        </button>
      </form>

      {/* Real-time list of added recipes */}
      <div className="rcnt flex w-2/3 flex-col gap-2 items-center text-center">
        <h2 className="text-sky-500 text-2xl  decoration-underline text-center">
          Your Recipes:{" "}
        </h2>
        <ul className="listcnt2 rbox bg-slate-900 p-20 border-2 w-2/3 flex flex-col h-96px overflow-y-scroll rounded-xl gap-4  border-indigo-500 shadow-xl">
          {recipes.map((recipe) => (
            <li
              className="list2 bg-sky-500 text-left items-center flex-col flex p-4 w-auto gap-4 hover:scale-105 hover:shadow-xl hover:bg-indigo-600 border-black border-4 rounded-lg gap-4"
              key={recipe.id}
            >
              <p className="field text-slate-900 flex gap-2 text-left flex w-72 flex-col p-1 m-2 text-xl ">
                {" "}
                <img src="../recipe.svg" className="w-6 "></img>
                Recipe Name :{" "}
                <span className="text-stone-900 font-bold border-2 border-black bg-indigo-400 p-2 rounded-xl">
                  {recipe.title}
                </span>{" "}
              </p>
              <p className="field text-slate-900 text-left flex w-72 flex-col p-1 m-2  text-l">
                {" "}
                Making Process :{" "}
                <span className=" font-semibold border-2 border-black bg-indigo-400 p-2 rounded-xl">
                  {recipe.process}
                </span>{" "}
              </p>
              <p className="field text-slate-900 flex text-left flex-col w-72 p-1 m-2 text-l">
                {" "}
                Ingredients Required :{" "}
                <span className="text-slate-900 font-semibold border-2 border-black bg-indigo-400 p-2 rounded-xl">
                  {recipe.items}
                </span>{" "}
              </p>
              <RDeleteItem id={recipe.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddRecepie;
