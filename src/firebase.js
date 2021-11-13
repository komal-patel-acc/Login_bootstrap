import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();

export const db = app.firestore();
export const storage = app.storage();

export const addData = async (uid, data) => {
  await db.collection("users").doc(uid).set(data);
};

export const getData = async (uid) => {
  const dataDB = db.collection("users").doc(uid);
  const doc = await dataDB.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
    return doc.data();
  }
};

export default storage;
