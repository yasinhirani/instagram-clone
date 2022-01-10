import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABI5YhS_Q8NIwy5BBpVkGTEgRdQ7N8hEM",
  authDomain: "instagram-clone-55db0.firebaseapp.com",
  projectId: "instagram-clone-55db0",
  storageBucket: "instagram-clone-55db0.appspot.com",
  messagingSenderId: "729215924442",
  appId: "1:729215924442:web:bc35da97ad3c9c5588cde3",
  measurementId: "G-D6WZNFCBBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, 'gs://instagram-clone-55db0.appspot.com');

export {app, db, storage};