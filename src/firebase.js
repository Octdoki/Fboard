import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDWXZ-uMlugnoDc5mZzWu2IZuka9Bm0Ydg",
  authDomain: "fir-board-f3a85.firebaseapp.com",
  databaseURL: "https://fir-board-f3a85-default-rtdb.firebaseio.com",
  projectId: "fir-board-f3a85",
  storageBucket: "fir-board-f3a85.appspot.com",
  messagingSenderId: "557153572860",
  appId: "1:557153572860:web:59c178b34459ca72ff8479"
};


  // Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();