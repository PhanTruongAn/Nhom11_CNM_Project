import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB0fpP09QnXAp37BLxqo5UTUwjGFh_0yOo",
  authDomain: "halo-project-4150f.firebaseapp.com",
  projectId: "halo-project-4150f",
  storageBucket: "halo-project-4150f.appspot.com",
  messagingSenderId: "987909110009",
  appId: "1:987909110009:web:d47b0d384e2500cb854a28",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
