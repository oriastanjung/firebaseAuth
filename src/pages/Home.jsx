import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged,signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigation = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.reload()
    } catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uuid = user.uid;
        console.log("uid >> ", uuid);
      } else {
        navigation("/login");
        console.log("user sign out");
      }
    });
  }, []);
  return (
    <div className="flex justify-between p-4">
      <h1>Home</h1>
      <button
        className="bg-red-400 px-4 py-2 rounded-lg text-xl text-white font-bold"
        onClick={logout}
      >
        logout
      </button>
    </div>
  );
}

export default Home;
