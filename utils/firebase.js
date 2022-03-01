// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyArUQH6E-ruASXDS43MAs-LE_QDjjkA73c",
  authDomain: "stone-dc116.firebaseapp.com",
  projectId: "stone-dc116",
  storageBucket: "stone-dc116.appspot.com",
  messagingSenderId: "824449225051",
  appId: "1:824449225051:web:9df0f53bd24bbd55ffca7e",
  measurementId: "G-VDB0GS2PZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getStorage(app);
