import { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import db from "../firebase/firestore";
import { auth } from "../firebase/config"; // Import Firebase config and auth
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const AddItem = (props) => {
  const [value, setValue] = useState("");
  const [qty, setQty] = useState("");
  const [user] = useAuthState(auth); // Get the authenticated user
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("User not authenticated");
      router.push("/");

      return;
    }

    try {
      const docRef = await addDoc(
        collection(db, "users", user.uid, "GroceryItems"), // Use user.uid instead of user.id
        {
          value: value,
          qty: qty,
        }
      );
      console.log("Item added with ID:", docRef.id);
      window.location.reload(); // Reload after adding the item
      setValue("");
      setQty("");
    } catch (error) {
      console.log("Error adding the item!", error);
    }
  };

  return (
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
        Add Item <img src="./add.svg" className="w-6 "></img>
      </button>
    </form>
  );
};

export default AddItem;
