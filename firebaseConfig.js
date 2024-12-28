// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDP9NjXgVxspJWfHTwHzLK3X4_rZrWl3Lw",
    authDomain: "mobilbead-fca63.firebaseapp.com",
    projectId: "mobilbead-fca63",
    storageBucket: "mobilbead-fca63.firebasestorage.app",
    messagingSenderId: "213057851408",
    appId: "1:213057851408:web:1332c65e2de9085d87ba95",
    measurementId: "G-FV6Z7RRGT0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
