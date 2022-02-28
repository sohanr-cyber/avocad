// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6NKhzvPMJbA3_aOK7eOv1MuQBtkM4N8Y",
  authDomain: "drive-ccbbd.firebaseapp.com",
  projectId: "drive-ccbbd",
  storageBucket: "drive-ccbbd.appspot.com",
  messagingSenderId: "471551820517",
  appId: "1:471551820517:web:0c17d7a985164dfae64a0c",
  measurementId: "G-MSRSTMXHL3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getStorage(app);
