
import firebase from "firebase/compat/app";
// Authentication //
import{getAuth}from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBMlbrZWCusU4IYafUOQKMrHQM2RLjXcyY",
  authDomain: "clone-6a114.firebaseapp.com",
  projectId: "clone-6a114",
  storageBucket: "clone-6a114.firebasestorage.app",
  messagingSenderId: "182034993800",
  appId: "1:182034993800:web:84a106a41a3d7a8da4853d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore();