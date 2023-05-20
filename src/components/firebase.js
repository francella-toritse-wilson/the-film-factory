// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPu8izdTR626zs_6ZvPPrPejK15fM9BIc",
  authDomain: "the-film-factory.firebaseapp.com",
  databaseURL: "https://the-film-factory-default-rtdb.firebaseio.com",
  projectId: "the-film-factory",
  storageBucket: "the-film-factory.appspot.com",
  messagingSenderId: "278375880148",
  appId: "1:278375880148:web:25766f420e89f61db13241"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebase;