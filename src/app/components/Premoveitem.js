"use client";

import db from "../firebase/firestore";
import { doc, deleteDoc } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth"; // Import hook for authentication
import { auth } from "../firebase/config";

const PDeleteItem = ({ id }) => {
  const [user] = useAuthState(auth); // Get the authenticated user

  const handleDelete = async () => {
    if (user) {
      // Reference to the specific user's collection
      const itemRef = doc(db, "users", user.uid, "PantryItems", id);
      try {
        await deleteDoc(itemRef);
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Error deleting");
      }
    } else {
      alert("User is not authenticated.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="border flex gap-2 items-center bg-red-400 hover:shadow-xl hover:bg-red-900 p-1 rounded text-black"
    >
      {" "}
      <img src="../trash.svg" className="w-6 "></img>
    </button>
  );
};

export default PDeleteItem;
