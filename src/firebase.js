
import {  initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyBBDiw0GBxAYkYJQchg-ZoxYrlDTTSfppQ",
//   authDomain: "chat-f4006.firebaseapp.com",
//   projectId: "chat-f4006",
//   storageBucket: "chat-f4006.appspot.com",
//   messagingSenderId: "711018421521",
//   appId: "1:711018421521:web:aa202400d2bd99e0b880b0",
//   // measurementId: "G-NKT283ZNST"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBBDiw0GBxAYkYJQchg-ZoxYrlDTTSfppQ",
  authDomain: "chat-f4006.firebaseapp.com",
  projectId: "chat-f4006",
  storageBucket: "chat-f4006.appspot.com",
  messagingSenderId: "711018421521",
  appId: "1:711018421521:web:aa202400d2bd99e0b880b0",
  measurementId: "G-NKT283ZNST"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
