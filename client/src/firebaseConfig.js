// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFn7aH53yH0GecwayhTjmcIiC4h2DSqbg",
    authDomain: "social-media-b2925.firebaseapp.com",
    projectId: "social-media-b2925",
    storageBucket: "social-media-b2925.appspot.com",
    messagingSenderId: "525437289222",
    appId: "1:525437289222:web:2c749075381682a818d487",
    measurementId: "G-J7276XQL16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);