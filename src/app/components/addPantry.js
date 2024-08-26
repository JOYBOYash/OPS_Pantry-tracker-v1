"use client";
import { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import db from "../firebase/firestore";
import { auth } from "../firebase/config"; // Import Firebase config and auth
import { useAuthState } from "react-firebase-hooks/auth"; // Hook to get the authenticated user
import { useRouter } from "next/navigation";

const AddPantry = () => {
  const [value, setValue] = useState("");
  const [qty, setQty] = useState("");
  const [date, setDate] = useState("");
  const [user] = useAuthState(auth); // Get the authenticated user
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("User not authenticated");
      router.push("/");
    }

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
      window.location.reload();
    } catch (error) {
      console.log("Error adding the item!", error);
    }
  };

  return (
    <form
      id="dateForm"
      className="flex flex-col shadow-xl rounded-md bg-slate-800 border-2 border-slate-700 p-10 gap-4"
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
  );
};

export default AddPantry;
