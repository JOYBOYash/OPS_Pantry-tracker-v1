"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore"; // Correct import
import db from "../firebase/firestore";
import { auth } from "../firebase/config"; // Ensure you're importing the correct Firebase config
import { useAuthState } from "react-firebase-hooks/auth";
import GDeleteItem from "./Gremoveitem"; // Assuming you have a delete function

import "@/app/queries.css";

const ListItems = () => {
  const [items, setItems] = useState([]);
  const [user] = useAuthState(auth); // Get the authenticated user

  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        try {
          // Fetching the items from the specific user collection
          const querySnapshot = await getDocs(
            collection(db, "users", user.uid, "GroceryItems") // Retrieve user-specific data
          );
          setItems(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        } catch (error) {
          console.log("Error fetching items: ", error);
        }
      }
    };

    fetchItems();
  }, [user]); // Fetch only when the user is authenticated

  return (
    <div className="flex flex-col w-5/6 gap-2 items-center text-center">
      <h2 className="text-sky-500 text-2xl decoration-underline text-center">
        In your Cart:{" "}
      </h2>
      <ul className="listcnt bg-slate-900 p-20 border-2 overflow-y-scroll h-64 gap-4  rounded-md gap-4 border-indigo-500 shadow-xl">
        {items.map((item) => (
          <li
            className="list bg-sky-500 m-2 text-left items-center flex p-4 w-auto gap-4 hover:scale-105 hover:shadow-xl hover:bg-indigo-600 border-black border-4 rounded-lg gap-4"
            key={item.id}
          >
            <p className="field text-slate-900 flex gap-2 text-left flex w-72 flex-col p-1 m-2 text-xl">
              {" "}
              Item Name:{" "}
              <span className=" font-semibold border-2 border-black bg-indigo-400 p-2 rounded-xl">
                {" "}
                {item.value}{" "}
              </span>{" "}
            </p>
            <p className="field text-slate-900 flex gap-2 text-left flex w-72 flex-col p-1 m-2 text-xl">
              {" "}
              Item Quantity:{" "}
              <span className=" font-semibold border-2 border-black bg-indigo-400 p-2 rounded-xl">
                {item.qty}
              </span>{" "}
            </p>
            <GDeleteItem id={item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
