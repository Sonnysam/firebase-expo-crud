import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_xxNnHWD0d3TfORutBUfxQQ1iMQxq-GE",
  authDomain: "fir-expo-crud.firebaseapp.com",
  projectId: "fir-expo-crud",
  storageBucket: "fir-expo-crud.appspot.com",
  messagingSenderId: "986247513740",
  appId: "1:986247513740:web:b48e1eb9b105d9dc279da9",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
