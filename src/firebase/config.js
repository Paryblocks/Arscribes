import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCg1o4GSTqiamzZIhJR5b6AK-2Yffvwl00",
  authDomain: "arscribes-3c156.firebaseapp.com",
  projectId: "arscribes-3c156",
  storageBucket: "arscribes-3c156.appspot.com",
  messagingSenderId: "697068104061",
  appId: "1:697068104061:web:400cbd6d91c17dc3094414"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };