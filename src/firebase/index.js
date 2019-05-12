import firebase from "firebase/app";
import "firebase/storage";
require("dotenv").config();

var firebaseConfig = {
  apiKey: "AIzaSyBPZvUaFJUsnrx94v2lKN_B0dYH5P0TMPk",
  authDomain: "fabryn-4d9bd.firebaseapp.com",
  databaseURL: "https://fabryn-4d9bd.firebaseio.com",
  projectId: "fabryn-4d9bd",
  storageBucket: "fabryn-4d9bd.appspot.com",
  messagingSenderId: "190344122851",
  appId: "1:190344122851:web:45dad71e98ad2b3c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
