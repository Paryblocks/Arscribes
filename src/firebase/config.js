import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA0iMHkVQn6eq7Smsmo7NzcEDpg8ATDgLU",
  authDomain: "arscribes-5193c.firebaseapp.com",
  projectId: "arscribes-5193c",
  storageBucket: "arscribes-5193c.appspot.com",
  messagingSenderId: "894332334396",
  appId: "1:894332334396:web:bdbaa49f56b4c743d16e39"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };