// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebase.js/9.00/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebase.js/9.00/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from'https://www.gstatic.com/firebase.js/9.00/firebase-auth.js';
import { getFirestore } from'https://www.gstatic.com/firebase.js/9.00/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = initializeApp = {
  apiKey: "AIzaSyA-gKWE9mG1xiQLDige6QN6dPU2l5cOE64",
  authDomain: "game-box-data-base.firebaseapp.com",
  projectId: "game-box-data-base",
  storageBucket: "game-box-data-base.appspot.com",
  messagingSenderId: "749162591639",
  appId: "1:749162591639:web:1b180b99ef55840101c0d2",
  measurementId: "G-KRQ0GG07R8"
};
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const 

// Detect auth state
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('Logged in!');
    } else {
        console.log('No User...');
    }
});



// Initialize Firebase
const app = initializeApp(firebaseApp);
const analytics = getAnalytics(app);