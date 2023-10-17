// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcn0RCPRjrWjdGj8idG7T1QBdJy3fT5dI",
  authDomain: "bookstore-2466a.firebaseapp.com",
  projectId: "bookstore-2466a",
  storageBucket: "bookstore-2466a.appspot.com",
  messagingSenderId: "140843688455",
  appId: "1:140843688455:web:588240105aa9d60e2d80a2",
  measurementId: "G-FQG1SVXE42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
//setPersistence(auth, browserLocalPersistence);
export default auth;