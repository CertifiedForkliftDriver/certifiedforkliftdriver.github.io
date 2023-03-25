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


const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Handle sign-up form submit

const firebaseConfig = {
          apiKey: "AIzaSyBP_8A81Fbfmake_3Qg_5KhWd6-1XtfM0k",
          authDomain: "gamebox-381701.firebaseapp.com",
          projectId: "gamebox-381701",
          storageBucket: "gamebox-381701.appspot.com",
          messagingSenderId: "745560099853",
          appId: "1:745560099853:web:5b2699432e6cfec03bd944",
          measurementId: "G-GC71CVBP6X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

const signupForm = document.querySelector("#signup-form");
const signupEmailInput = document.querySelector("#signup-email-input");
const signupPasswordInput = document.querySelector("#signup-password-input");

const loginButton = document.querySelector("#login-button");
const signupButton = document.querySelector("#signup-button");
const logoutButton = document.querySelector("#logout-button");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User logged in");
    })
    .catch((error) => {
      console.error(error);
    });
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupEmailInput.value;
  const password = signupPasswordInput.value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User created: ", user.uid);
    })
    .catch((error) => {
      console.error(error);
    });
});


