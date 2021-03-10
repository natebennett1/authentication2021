import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBmrub_ZLTCYzzN_PfbloB3jRo-YPxyhN4",
  authDomain: "healthtracker2021-2a269.firebaseapp.com",
  projectId: "healthtracker2021-2a269",
  storageBucket: "healthtracker2021-2a269.appspot.com",
  messagingSenderId: "809999464423",
  appId: "1:809999464423:web:bedfc666e9161f10972f42"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
