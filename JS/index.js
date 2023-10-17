// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDValztfB_qgf0FDdUYFj9YpkR7fY9JuZc",
  authDomain: "finance-freaks.firebaseapp.com",
  databaseURL: "https://finance-freaks-default-rtdb.firebaseio.com",
  projectId: "finance-freaks",
  storageBucket: "finance-freaks.appspot.com",
  messagingSenderId: "159981459099",
  appId: "1:159981459099:web:cae992cfa226b59390983e",
  measurementId: "G-CCYMGJ39JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);