// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAYxzvSXKDA3AJIseUhqDjImaGudNMVI58",
  authDomain: "sweatcrew-73f14.firebaseapp.com",
  projectId: "sweatcrew-73f14",
  storageBucket: "sweatcrew-73f14.firebasestorage.app",
  messagingSenderId: "937775074852",
  appId: "1:937775074852:web:50fd6d49bbe1dec68e52b1",
  measurementId: "G-07TVRJ1JTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//Export the auth instance
export const auth = getAuth(app);
export const db   = getFirestore(app)