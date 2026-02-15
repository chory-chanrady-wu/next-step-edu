import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAbFZgFYxZzQBPSErTH4vo-ggyenPZaNo",
  authDomain: "project-630945281513.firebaseapp.com",
  projectId: "project-630945281513",
  storageBucket: "project-630945281513.firebasestorage.app",
  messagingSenderId: "713349639184",
  appId: "1:713349639184:web:b9b3df0de88a3022d4ee95",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
