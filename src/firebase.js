// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyXEBoAZF8LSjeVE_LwX6KRhI0nyjVNN8",
  authDomain: "mcity-d4358.firebaseapp.com",
  projectId: "mcity-d4358",
  storageBucket: "mcity-d4358.appspot.com",
  messagingSenderId: "345932525939",
  appId: "1:345932525939:web:8174bba38f797755fa5506",
  measurementId: "G-Z13KGXBRP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);