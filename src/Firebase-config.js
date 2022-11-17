import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMJCYE-We1QDfdIM13--upfCwY5a2rR_o",
  authDomain: "obio-primary-school.firebaseapp.com",
  projectId: "obio-primary-school",
  storageBucket: "obio-primary-school.appspot.com", 
  messagingSenderId: "860051669810", 
  appId: "1:860051669810:web:f2cca50ffc940c3cb24d2b" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); // for storing data into firestore
export const provider = new GoogleAuthProvider(); //signing in with google
export default app;