//latest version use imports like below
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAG87a6U4wPjUudTHgPyGOiG7kx-a8zNKE",
  authDomain: "cart-6b4b2.firebaseapp.com",
  projectId: "cart-6b4b2",
  storageBucket: "cart-6b4b2.appspot.com",
  messagingSenderId: "644476386005",
  appId: "1:644476386005:web:327c4d673cf0bbb849805c"
};
//latest version initiliaze and export db like this below
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
