import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDSy3N_1qrQn62lvtO2kK-wntgIUCXoWcU",
    authDomain: "expense-tracker-c44b3.firebaseapp.com",
    databaseURL:
        "https://expense-tracker-c44b3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expense-tracker-c44b3",
    storageBucket: "expense-tracker-c44b3.firebasestorage.app",
    messagingSenderId: "1092635700224",
    appId: "1:1092635700224:web:ed40dcc6e9e360083c7ce5",
    measurementId: "G-2YXJC6ML7P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);