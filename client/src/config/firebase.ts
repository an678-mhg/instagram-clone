import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnoEdeywht_cPs0G6gbqNItjgJlPwcWZ4",
  authDomain: "auth-9e1bd.firebaseapp.com",
  projectId: "auth-9e1bd",
  storageBucket: "auth-9e1bd.appspot.com",
  messagingSenderId: "80890714936",
  appId: "1:80890714936:web:80db58e862109297c07fcd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
