import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyATQtDIXavWe2osm1hv-ZA6uqMD2qe0erc",
  authDomain: "react-firebase-insta-clone.firebaseapp.com",
  projectId: "react-firebase-insta-clone",
  storageBucket: "react-firebase-insta-clone.appspot.com",
  messagingSenderId: "537429241700",
  appId: "1:537429241700:web:ca286da3dcd21b3fc65471",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//here is where I want to call seed file only once
// seedDatabase(firebase);

export { firebase, FieldValue };
