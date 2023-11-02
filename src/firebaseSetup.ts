// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: (process.env.REACT_APP_API_KEY as string),
  authDomain: (process.env.REACT_APP_AUTH_DOMAIN as string),
  projectId: (process.env.REACT_APP_PROJECT_ID as string),
  storageBucket: (process.env.REACT_APP_STORAGE_BUCKET as string),
  messagingSenderId: (process.env.REACT_APP_MESSAGING_SENDER_ID as string),
  appId: (process.env.REACT_APP_APP_ID as string),
  measurementId: (process.env.REACT_APP_MEASUREMENT_ID as string)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
//setPersistence(auth, browserLocalPersistence);
export default auth;