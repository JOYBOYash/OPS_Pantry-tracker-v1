// import db from "../firebase/firestore";
// import { doc, deleteDoc } from "@firebase/firestore";

// const RDeleteItem = ({ id }) => {
//   const handleDelete = async () => {
//     const itemRef = doc(db, "Recepies", id);
//     try {
//       await deleteDoc(itemRef);
//       alert("item has been deleted succesfully");
//       window.location.reload();
//     } catch (error) {
//       console.error("Error deleting document:", error);
//       alert("Error deleting");
//     }
//   };
//   return (
//     <button
//       onClick={handleDelete}
//       className="border bg-red-400 p-1 rounded text-white"
//     >
//       {" "}
//       Delete{" "}
//     </button>
//   );
// };

// export default RDeleteItem;

import db from "../firebase/firestore";
import { doc, deleteDoc } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth"; // Import hook for authentication
import { auth } from "../firebase/config";

const RDeleteItem = ({ id }) => {
  const [user] = useAuthState(auth); // Get the authenticated user

  const handleDelete = async () => {
    if (user) {
      // Reference to the specific user's collection
      const itemRef = doc(db, "users", user.uid, "Recipes", id);
      try {
        await deleteDoc(itemRef);
        alert("Item has been deleted successfully");
        window.location.reload();
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
      className="border flex gap-2 w-10 flex items-center bg-red-400 justify-center hover:shadow-xl hover:bg-red-900 p-1 rounded text-black"
    >
      {" "}
      <img src="./trash.svg" className="w-6 justify-center "></img>
    </button>
  );
};

export default RDeleteItem;
