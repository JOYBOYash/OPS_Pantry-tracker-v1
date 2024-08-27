// "use client";
// import { useState } from "react";
// import { collection, addDoc } from "@firebase/firestore";
// import db from "../firebase/firestore";
// import { auth } from "../firebase/config"; // Import Firebase config and auth
// import { useAuthState } from "react-firebase-hooks/auth"; // Hook to get the authenticated user
// import { useRouter } from "next/navigation";

// const AddPantry = () => {
//   const [value, setValue] = useState("");
//   const [qty, setQty] = useState("");
//   const [date, setDate] = useState("");
//   const [user] = useAuthState(auth); // Get the authenticated user
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // if (!user) {
//     //   alert("User not authenticated");
//     //   router.push("/");
//     // }

//     try {
//       // Add the document to the specific user's PantryItems collection
//       const docRef = await addDoc(
//         collection(db, "users", user.uid, "PantryItems"),
//         {
//           value: value,
//           qty: qty,
//           date: date,
//         }
//       );
//       console.log("Item added with ID:", docRef.id);

//       // After adding to Firestore, generate Google Calendar event link
//       const startDate = date.replace(/-/g, ""); // Format as YYYYMMDD
//       const eventTitle = `${value} in your pantry is expiring today`;
//       const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
//         eventTitle
//       )}&dates=${startDate}/${startDate}&details=This item in your pantry is expiring today`;

//       // Redirect user to Google Calendar to set the event
//       window.open(calendarLink, "_blank");

//       // Clear form fields
//       setValue("");
//       setQty("");
//       setDate("");
//       // window.location.reload();
//     } catch (error) {
//       console.log("Error adding the item!", error);
//     }
//   };

//   return (
//     <form
//       id="dateForm"
//       className="flex flex-col shadow-xl rounded-md bg-slate-800 border-2 border-slate-700 p-10 gap-4"
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

//       <label htmlFor="date" className="text-sky-700 text-center">
//         Set Expiry Reminder
//       </label>
//       <input
//         className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
//         type="date"
//         value={date}
//         id="eventDate"
//         name="eventDate"
//         onChange={(e) => setDate(e.target.value)}
//         placeholder="Add Expiry Date"
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

// export default AddPantry;

"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "@firebase/firestore";
import db from "../firebase/firestore";
import { auth } from "../firebase/config"; // Import Firebase config and auth
import { useAuthState } from "react-firebase-hooks/auth"; // Hook to get the authenticated user
import { useRouter } from "next/navigation";
import PDeleteItem from "./Premoveitem";
const AddPantry = () => {
  const [value, setValue] = useState("");
  const [qty, setQty] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([]); // Real-time pantry items state
  const [user] = useAuthState(auth); // Get the authenticated user
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(db, "users", user.uid, "PantryItems"),
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
      // Add the document to the specific user's PantryItems collection
      const docRef = await addDoc(
        collection(db, "users", user.uid, "PantryItems"),
        {
          value: value,
          qty: qty,
          date: date,
        }
      );
      console.log("Item added with ID:", docRef.id);

      // After adding to Firestore, generate Google Calendar event link
      const startDate = date.replace(/-/g, ""); // Format as YYYYMMDD
      const eventTitle = `${value} in your pantry is expiring today`;
      const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        eventTitle
      )}&dates=${startDate}/${startDate}&details=This item in your pantry is expiring today`;

      // Redirect user to Google Calendar to set the event
      window.open(calendarLink, "_blank");

      // Clear form fields
      setValue("");
      setQty("");
      setDate("");
    } catch (error) {
      console.log("Error adding the item!", error);
    }
  };

  return (
    <div className="section flex gap-10 items-center justify-center p-10">
      <form
        id="dateForm"
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

        <label htmlFor="date" className="text-sky-700 text-center">
          Set Expiry Reminder
        </label>
        <input
          className="bg-indigo-900 rounded-md hover:scale-105 hover:bg-indigo-600 p-2 text-slate-900 w-auto"
          type="date"
          value={date}
          id="eventDate"
          name="eventDate"
          onChange={(e) => setDate(e.target.value)}
          placeholder="Add Expiry Date"
        />

        <button
          className="bg-indigo-900 flex gap-2 items-center justify-center text-xl p-2 hover:shadow-xl rounded-full hover:text-black hover:bg-indigo-600"
          type="submit"
        >
          Add Item <img src="../add.svg" className="w-6 "></img>
        </button>
      </form>

      {/* Real-time list of pantry items */}
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
                <img src="../pantry.svg" className="w-6 "></img>
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
    </div>
  );
};

export default AddPantry;
