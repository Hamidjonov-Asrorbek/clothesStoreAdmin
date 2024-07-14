import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzUejSPDvKBIOHk33ciaqFRcbh_gsXgHY",
  authDomain: "online-clothes-fe4c2.firebaseapp.com",
  projectId: "online-clothes-fe4c2",
  storageBucket: "online-clothes-fe4c2.appspot.com",
  messagingSenderId: "647607414177",
  appId: "1:647607414177:web:a047553f8a98b627946fe0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
