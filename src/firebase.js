import { initializeApp } from "firebase/app";

import { getFirestore, collection } from '@firebase/firestore'
// ... other @firebase imports
import { getAuth } from "@firebase/auth";


// Your web app's Firebase configuration

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBu68Q2ecUW7ey6zrR4L5FTeJDN4yAPgqA",
  authDomain: "proyectovue-1c548.firebaseapp.com",
  projectId: "proyectovue-1c548",
  storageBucket: "proyectovue-1c548.appspot.com",
  messagingSenderId: "1078396031237",
  appId: "1:1078396031237:web:63125294215957212be76c"

});


// used for the firestore refs
const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp);
