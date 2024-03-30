import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD31fHmRZXMRjBZHh3HHmUInjeFeTnnAJY",
  authDomain: "shop-2c3d6.firebaseapp.com",
  projectId: "shop-2c3d6",
  storageBucket: "shop-2c3d6.appspot.com",
  messagingSenderId: "963366384316",
  appId: "1:963366384316:web:6067586bf701e6550c16b9",
  measurementId: "G-BVYETH39MC"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()