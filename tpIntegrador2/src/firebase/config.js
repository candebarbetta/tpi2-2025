
import app from "firebase/app"
import firebase from "firebase"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBaxG-wc9W6XaPyN8Y-WAdyGAz0FJoLkM",
  authDomain: "tpi2-2025firebase.firebaseapp.com",
  projectId: "tpi2-2025firebase",
  storageBucket: "tpi2-2025firebase.firebasestorage.app",
  messagingSenderId: "956253459085",
  appId: "1:956253459085:web:92d18b0a9c911642a688c4"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()
