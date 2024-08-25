"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "@firebase/firestore";
import db from "../firebase/firestore";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth"; // Hook to get authenticated user
import RDeleteItem from "./RRemoveitem"; // Assuming you have a delete function

const ListRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [user] = useAuthState(auth); // Get the authenticated user

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user) {
        try {
          const querySnapshot = await getDocs(
            collection(db, "users", user.uid, "Recipes") // Fetch user-specific recipes
          );
          setRecipes(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        } catch (error) {
          console.log("Error fetching recipes: ", error);
        }
      }
    };

    fetchRecipes();
  }, [user]); // Fetch when the user is authenticated

  return (
    <div className="flex flex-col w-5/6 gap-2 items-center text-center">
      <h2 className="text-sky-500 text-2xl decoration-underline text-center">
        Your Recipes:{" "}
      </h2>
      <ul className="listcnt2 bg-slate-900 p-20 border-2 w-2/3 flex overflow-x-scroll rounded-xl gap-4  border-indigo-500 shadow-xl">
        {recipes.map((recipe) => (
          <li
            className="list2 bg-sky-500 text-left items-center flex-col flex p-4 w-auto gap-4 hover:scale-105 hover:shadow-xl hover:bg-indigo-600 border-black border-4 rounded-lg gap-4"
            key={recipe.id}
          >
            <p className="field text-slate-900 flex gap-2 text-left flex w-72 flex-col p-1 m-2 text-xl ">
              {" "}
              <img src="/recipe.svg" className="w-6 "></img>
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
            <RDeleteItem id={recipe.id} /> {/* Delete button component */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListRecipes;
