
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChuiJ_Hirirl_YoEHbBRvuQ7lhtCrQrDQ",
  authDomain: "lryix-f01b3.firebaseapp.com",
  projectId: "lryix-f01b3",
  storageBucket: "lryix-f01b3.firebasestorage.app",
  messagingSenderId: "128352021968",
  appId: "1:128352021968:web:b0b4f8d69900d7a4319dd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export { app, auth };
