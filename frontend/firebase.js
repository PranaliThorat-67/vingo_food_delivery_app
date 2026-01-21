// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "vingo-food-delivery-app-53b71.firebaseapp.com",
    projectId: "vingo-food-delivery-app-53b71",
    storageBucket: "vingo-food-delivery-app-53b71.firebasestorage.app",
    messagingSenderId: "919333715154",
    appId: "1:919333715154:web:c5ce9d7e88b5369763c10b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };