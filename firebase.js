// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD29evm2gX8afmPyxK5-2chP2yFVJAyUSM",
  authDomain: "planilha-financeira-e91a2.firebaseapp.com",
  projectId: "planilha-financeira-e91a2",
  storageBucket: "planilha-financeira-e91a2.appspot.com",
  messagingSenderId: "1002942893577",
  appId: "1:1002942893577:web:0aeffdfc6182c2da82b2d8",
  measurementId: "G-R0Z3N4PP4P",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, collection, addDoc, query, where, onSnapshot };