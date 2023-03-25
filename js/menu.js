// This is the feature that allows responsive menu changes in the nav bar when you shrink the window size
const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen 
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
// Initialize Firebase
const firebaseConfig = {
          apiKey: "AIzaSyBP_8A81Fbfmake_3Qg_5KhWd6-1XtfM0k",
          authDomain: "gamebox-381701.firebaseapp.com",
          projectId: "gamebox-381701",
          storageBucket: "gamebox-381701.appspot.com",
          messagingSenderId: "745560099853",
          appId: "1:745560099853:web:5b2699432e6cfec03bd944",
          measurementId: "G-GC71CVBP6X"
  // your firebase configuration here
};

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

// Handle sign-up form submit
const signUpForm = document.querySelector('#sign-up-form');
signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = signUpForm.email.value;
  const password = signUpForm.password.value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed up successfully
      console.log(userCredential.user);
    })
    .catch((error) => {
      console.error(error);
    });
});

// Handle login form submit
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User logged in successfully
      console.log(userCredential.user);
    })
    .catch((error) => {
      console.error(error);
    });
});