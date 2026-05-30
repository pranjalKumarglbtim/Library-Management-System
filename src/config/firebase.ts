import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// Replace with your own Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB_MA0vwj3OW4Ja_5LD0TKjgqSvpiv10tQ",
  authDomain: "library-management-syste-73910.firebaseapp.com",
  projectId: "library-management-syste-73910",
  storageBucket: "library-management-syste-73910.firebasestorage.app",
  messagingSenderId: "19219274757",
  appId: "1:19219274757:web:a2f993a17b06be8b87d06c",
  measurementId: "G-MGSPPCCMBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
