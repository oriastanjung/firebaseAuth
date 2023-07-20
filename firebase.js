import {initializeApp} from "firebase/app"
import {GoogleAuthProvider, getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyCoLJ_f_3S9LrzN-kZIekqClsB6RyXjkWs",
    authDomain: "focus-app-65972.firebaseapp.com",
    projectId: "focus-app-65972",
    storageBucket: "focus-app-65972.appspot.com",
    messagingSenderId: "923263678886",
    appId: "1:923263678886:web:018fd5eab668bc0e993767",
    measurementId: "G-TG517VZY4R"
  };
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()