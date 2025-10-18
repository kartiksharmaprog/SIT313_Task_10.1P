import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaZEoItoq1Y_rqPCi9TVWSUYvtRQ3ycQM",
  authDomain: "task-7-9bc64.firebaseapp.com",
  projectId: "task-7-9bc64",
  storageBucket: "task-7-9bc64.firebasestorage.app",
  messagingSenderId: "918943783451",
  appId: "1:918943783451:web:46bb0a65535e6a76b376be",
  measurementId: "G-LTPB8LWGP1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);