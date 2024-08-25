"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "@firebase/firestore";
import db from "../firebase/firestore";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth"; // Hook to get the authenticated user
import PDeleteItem from "./Premoveitem"; // Assuming you have a delete function

const ListPantry = () => {
  const [items, setItems] = useState([]);
  const [user] = useAuthState(auth); // Get the authenticated user

  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        try {
          // Retrieve user-specific PantryItems
          const querySnapshot = await getDocs(
            collection(db, "users", user.uid, "PantryItems")
          );
          setItems(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        } catch (error) {
          console.log("Error fetching pantry items: ", error);
        }
      }
    };

    fetchItems();
  }, [user]); // Fetch items when the user is authenticated

  return (
    <div className="flex w-5/6 flex-col gap-2 items-center text-center">
      <h2 className="text-sky-500 text-2xl decoration-underline text-center">
        Inventory:{" "}
      </h2>
      <ul className="listcnt2 bg-slate-900 p-20 border-2 w-2/3 flex overflow-x-scroll rounded-xl gap-4 border-indigo-500 shadow-xl">
        {items.map((item) => (
          <li
            className="list2 bg-sky-500 text-left items-center flex-col flex p-4 w-auto gap-4 hover:scale-105 hover:shadow-xl hover:bg-indigo-600 border-black border-4 rounded-lg gap-4"
            key={item.id}
          >
            <p className="field text-slate-900 text-left flex w-72 flex-col p-1 m-2 text-xl">
              <img src="/pantry.svg" className="w-6 "></img>
              Item Name:{" "}
              <span className="text-stone-900 font-bold border-2 border-black bg-indigo-400 p-2 rounded-xl">
                {item.value}
              </span>
            </p>
            <p className="field text-slate-900 text-left flex w-72 flex-col p-1 m-2 text-l">
              Item Quantity:{" "}
              <span className="font-semibold border-2 border-black bg-indigo-400 p-2 rounded-xl">
                {item.qty}
              </span>
            </p>
            <p className="field text-slate-900 flex text-left flex-col w-72 p-1 m-2 text-l">
              Item Expires On:{" "}
              <span className="text-slate-900 font-semibold border-2 border-black bg-indigo-400 p-2 rounded-xl">
                {item.date}
              </span>
            </p>
            <PDeleteItem id={item.id} /> {/* Delete button component */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPantry;
