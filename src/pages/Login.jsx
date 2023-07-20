import React,{useEffect, useState} from "react";
import { auth, googleProvider } from "../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigation = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginGoogle = async (e) => {
    e.preventDefault()
    try {
      const response = await signInWithPopup(auth,googleProvider)
      if(response.user){
        navigation("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log("response >> ", response);
      navigation("/");
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
      <h1 className="text-xl">Login</h1>
      <form className="mt-8 p-24 border-2 rounded-xl shadow-xl flex gap-5 flex-col items-center justify-center">
        <div className="flex flex-col gap-3 items-start">
          <label htmlFor="email">Email: </label>
          <input name="email" value={form.email} onChange={onChangeHandler} className="bg-slate-100 px-4 py-2 rounded-lg" type="email" />
        </div>
        <div className="flex flex-col gap-3 items-start">
          <label htmlFor="password">Password: </label>
          <input name="password" value={form.password} onChange={onChangeHandler}
            className="bg-slate-100 px-4 py-2 rounded-lg"
            type="password"
          />
        </div>
        <div>
          <Link className="text-blue-700 hover:font-bold" to={"/register"}>Register</Link>
        </div>
        <div className="flex flex-row justify-between gap-4">
        <div className="w-100 flex justify-center items-center">
          <button onClick={onSubmitHandler} className="bg-blue-500 px-4 py-2 text-white font-bold rounded-lg">
            LOGIN
          </button>
        </div>
        <div className="w-100 flex justify-center items-center">
          <button onClick={loginGoogle} className="bg-yellow-500 px-4 py-2 text-white font-bold rounded-lg">
            LOGIN witgh GOOGLE
          </button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
