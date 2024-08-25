import { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import db from "../firebase/firestore";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth"; // Hook to get the authenticated user
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "700"] });

const AddRecepie = () => {
  const [title, setTitle] = useState("");
  const [process, setProcess] = useState("");
  const [items, setItems] = useState("");
  const [user] = useAuthState(auth); // Get the authenticated user

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user) {
      try {
        const docRef = await addDoc(
          collection(db, "users", user.uid, "Recipes"), // Add the recipe under the user's specific collection
          {
            title: title,
            process: process,
            items: items,
          }
        );
        console.log("Recipe added with ID:", docRef.id);
        window.location.reload(); // Optional, could be removed for better UX
        setTitle("");
        setProcess("");
        setItems("");
      } catch (error) {
        console.log("Error adding the recipe!", error);
      }
    } else {
      console.log("No user authenticated.");
    }
  };

  return (
    <form
      className="flex flex-col shadow-xl rounded-md bg-slate-800 border-2 border-slate-700 p-10 gap-4"
      onSubmit={handleSubmit}
    >
      <input
        className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Your Recipe Name"
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
        placeholder="Add all required Items"
      />
      <label htmlFor="text" className={roboto.className}>
        {" "}
        *seperate items by comma
      </label>

      <button
        className="bg-indigo-900 text-xl flex justify-center items-center gap-2 p-2 hover:shadow-xl rounded-full hover:text-black hover:bg-indigo-600"
        type="submit"
      >
        Add Recipe <img src="/add.svg" className="w-6 "></img>
      </button>
    </form>
  );
};

export default AddRecepie;
