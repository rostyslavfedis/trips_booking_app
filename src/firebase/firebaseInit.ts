// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBlhvUb9BZso1sIj9I5gXV8ca_s7T5sffM",
    authDomain: "tripsbooking-593d6.firebaseapp.com",
    projectId: "tripsbooking-593d6",
    storageBucket: "tripsbooking-593d6.firebasestorage.app",
    messagingSenderId: "790330973091",
    appId: "1:790330973091:web:8671d7ee98503d41761816",
    measurementId: "G-BSH1L66H62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);