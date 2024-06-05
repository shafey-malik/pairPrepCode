import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCJzNZen1T5yOsUssOnpOkGi3VveaPyfic",
  authDomain: "preppair-dbb0d.firebaseapp.com",
  projectId: "preppair-dbb0d",
  storageBucket: "preppair-dbb0d.appspot.com",
  messagingSenderId: "921566845703",
  appId: "1:921566845703:web:6ea4c8f1e85ef88639c3a2",
  measurementId: "G-Y07Q58GSY8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);
export { app, db, rtdb, ref, set, get };
