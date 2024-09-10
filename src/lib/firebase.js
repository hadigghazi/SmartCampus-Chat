import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCBgZLzEK2CwyZlhYTPp-CrMYwe-nOsr_o",
  authDomain: "smartcampus-chat.firebaseapp.com",
  projectId: "smartcampus-chat",
  storageBucket: "smartcampus-chat.appspot.com",
  messagingSenderId: "861579220721",
  appId: "1:861579220721:web:b518654c286027650b7b50",
  measurementId: "G-RRB6SJL3BP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
export const analytics = getAnalytics(app);
