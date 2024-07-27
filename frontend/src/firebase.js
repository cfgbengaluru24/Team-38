// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jpmc-adb31.firebaseapp.com",
  projectId: "jpmc-adb31",
  storageBucket: "jpmc-adb31.appspot.com",
  messagingSenderId: "587507082145",
  appId: "1:587507082145:web:59280465252ae50050a1e0",
  measurementId: "G-YXBLJ4D5ZW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
