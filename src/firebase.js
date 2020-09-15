import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBtx61-wryDJeR3j7gJ1iQZu_CdneVnmS4",
  authDomain: "react-slack-5155f.firebaseapp.com",
  databaseURL: "https://react-slack-5155f.firebaseio.com",
  projectId: "react-slack-5155f",
  storageBucket: "gs://react-slack-5155f.appspot.com",
  messagingSenderId: "948911857249",
  appId: "1:948911857249:web:bfcec7e92ec99297071420",
  measurementId: "G-F3PJR4Z4E5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
