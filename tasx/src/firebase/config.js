import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

firebase.initializeApp({
  apiKey: "AIzaSyDJWOy4KRW7mbgGcSIRFv0X2JJdhtijMME",
  authDomain: "gamification-application.firebaseapp.com",
  projectId: "gamification-application",
  storageBucket: "gamification-application.appspot.com",
  messagingSenderId: "448219793133",
  appId: "1:448219793133:web:60ffd3079a245776146ee4",
  measurementId: "G-PZVCNT7ZQJ",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
