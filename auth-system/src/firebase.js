// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, MicrosoftAuthProvider, RecaptchaVerifier, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAK0z1cBlunQmy9ewcvEakKl1CeEIX1npM",
  authDomain: "auth-system-d083f.firebaseapp.com",
  projectId: "auth-system-d083f",
  storageBucket: "auth-system-d083f.appspot.com",
  messagingSenderId: "935659701101",
  appId: "1:935659701101:web:088f4b3198ccc96379d064",
  measurementId: "G-XJ2G26K764"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, MicrosoftAuthProvider, RecaptchaVerifier, signInWithPopup };
