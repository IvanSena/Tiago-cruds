// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdtwtvxqHsmMGY2vjfpmFMOSzlcdDacPk",
  authDomain: "ivantec-3539c.firebaseapp.com",
  projectId: "ivantec-3539c",
  storageBucket: "ivantec-3539c.appspot.com",
  messagingSenderId: "102224413338",
  appId: "1:102224413338:web:ca06ceee2a688565465523
};

// Initialize Firebase
let firebaseApp
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp()
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(firebaseConfig)
}

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)