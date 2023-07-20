import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigation = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log("response >> ", response);
      navigation("/login");
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uuid = user.uid;
        console.log("uid >> ", uuid);
        navigation("/");

      }
    });
  }, []);
  return (
    <div className="flex justify-center mt-24 items-center flex-col">
      <h1 className="text-xl">Register</h1>
      <form
        onSubmit={onSubmitHandler}
        className="mt-8 p-24 border-2 rounded-xl shadow-xl flex gap-5 flex-col items-center justify-center"
      >
        <div className="flex flex-col gap-3 items-start">
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            value={form.email}
            onChange={onChangeHandler}
            className="bg-slate-100 px-4 py-2 rounded-lg"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-3 items-start">
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            value={form.password}
            onChange={onChangeHandler}
            className="bg-slate-100 px-4 py-2 rounded-lg"
            type="password"
          />
        </div>
        <div>
          <Link className="text-blue-700 hover:font-bold" to={"/login"}>Login</Link>
        </div>
        <div className="w-100 flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 text-white font-bold rounded-lg"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
