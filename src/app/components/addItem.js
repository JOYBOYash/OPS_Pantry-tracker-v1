// "use client";

// import { useState } from "react";
// import { addDoc, collection } from "@firebase/firestore";
// import db from "../firebase/firestore";
// import { auth } from "../firebase/config"; // Import Firebase config and auth
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useRouter } from "next/navigation";

// const AddItem = () => {
//   const [value, setValue] = useState("");
//   const [qty, setQty] = useState("");
//   const [user] = useAuthState(auth); // Get the authenticated user
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const docRef = await addDoc(
//         collection(db, "users", user.uid, "GroceryItems"), // Use user.uid instead of user.id
//         {
//           value: value,
//           qty: qty,
//         }
//       );
//       console.log("Item added with ID:", docRef.id);
//       // window.location.reload(); // Reload after adding the item
//       setValue("");
//       setQty("");
//     } catch (error) {
//       console.log("Error adding the item!", error);
//     }
//   };

//   return (
//     <form
//       className="flex flex-col w-5/6 shadow-xl rounded-md bg-slate-800 border-2 border-slate-700 p-10 gap-4"
//       onSubmit={handleSubmit}
//     >
//       <input
//         className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
//         type="text"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="Add Item Name"
//       />
//       <input
//         className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
//         type="number"
//         min="1"
//         max="100"
//         value={qty}
//         onChange={(e) => setQty(e.target.value)}
//         placeholder="Add Item Quantity"
//       />
//       <button
//         className="bg-indigo-900 flex gap-2 items-center justify-center text-xl p-2 hover:shadow-xl rounded-full hover:text-black hover:bg-indigo-600"
//         type="submit"
//       >
//         Add Item <img src="../add.svg" className="w-6 "></img>
//       </button>
//     </form>
//   );
// };

// export default AddItem;

"use client";

import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot } from "@firebase/firestore";
import db from "../firebase/firestore";
import { auth } from "../firebase/config"; // Import Firebase config and auth
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import GDeleteItem from "./Gremoveitem";

const AddItem = () => {
  const [value, setValue] = useState("");
  const [qty, setQty] = useState("");
  const [user] = useAuthState(auth); // Get the authenticated user
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(db, "users", user.uid, "GroceryItems"),
        (snapshot) => {
          const newItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setItems(newItems);
        }
      );

      // Clean up the subscription on unmount
      return () => unsubscribe();
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "users", user.uid, "GroceryItems"), {
        value: value,
        qty: qty,
      });
      setValue("");
      setQty("");
    } catch (error) {
      console.log("Error adding the item!", error);
    }
  };

  return (
    <div className="section flex gap-10 items-center justify-center p-10">
      <form
        className="flex flex-col w-5/6 shadow-xl rounded-md bg-slate-800 border-2 border-slate-700 p-10 gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add Item Name"
        />
        <input
          className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
          type="number"
          min="1"
          max="100"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="Add Item Quantity"
        />
        <button
          className="bg-indigo-900 flex gap-2 items-center justify-center text-xl p-2 hover:shadow-xl rounded-full hover:text-black hover:bg-indigo-600"
          type="submit"
        >
          Add Item <img src="../add.svg" className="w-6 "></img>
        </button>
      </form>

      {/* Display the list of items */}
      <div className="flex flex-col w-5/6 justify-center gap-2 items-center text-center">
        <ul className="listcnt bg-slate-900 p-20 border-2 overflow-y-scroll h-64 gap-8  rounded-md gap-4 border-indigo-500 shadow-xl">
          <h2 className="text-sky-500 text-2xl decoration-underline text-center">
            In your Cart:{" "}
          </h2>
          {items.map((item) => (
            <li
              key={item.id}
              className="list bg-sky-500 m-2 text-left items-center justify-center flex p-4 w-auto gap-4 hover:scale-105 hover:shadow-xl hover:bg-indigo-600 border-black border-4 rounded-lg gap-4"
            >
              <img src="../cart.svg" className="w-6 "></img>

              <p className="field text-slate-900 flex gap-2 text-left flex w-72 flex-col p-1 m-2 text-xl">
                {" "}
                Item Name:{" "}
                <span className=" font-semibold border-2 border-black bg-indigo-400 p-2 rounded-xl">
                  {" "}
                  {item.value}{" "}
                </span>{" "}
              </p>

              {/* {item.value} - {item.qty} */}
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
    </div>
  );
};

export default AddItem;
