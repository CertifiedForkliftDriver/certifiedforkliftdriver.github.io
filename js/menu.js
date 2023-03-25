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
const auth = getAuth(app)

// Handle sign-up form submit
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

// Initialize Firebase
const firebaseConfig = {
          apiKey: "AIzaSyBP_8A81Fbfmake_3Qg_5KhWd6-1XtfM0k",
          authDomain: "gamebox-381701.firebaseapp.com",
          projectId: "gamebox-381701",
          storageBucket: "gamebox-381701.appspot.com",
          messagingSenderId: "745560099853",
          appId: "1:745560099853:web:5b2699432e6cfec03bd944",
          measurementId: "G-GC71CVBP6X"
  // Your Firebase config object here
};

firebase.initializeApp(firebaseConfig);
const authenticate = firebase.auth();

// Function to handle login and sign up form submission


// Function to sign up a new user
function signUpUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User created successfully!");
      // Redirect the user to the home page or dashboard
      // Here you can add your own logic to redirect to the appropriate page
    })
    .catch((error) => {
      console.error("Error creating user: ", error);
      // Show an error message to the user
      // Here you can add your own logic to display the error message to the user
    });
}

// Function to handle the sign-up form submission
function handleSignUpSubmit(event) {
  event.preventDefault();

  // Get the user's email and password from the form
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Call the signUpUser function with the email and password
  signUpUser(email, password);
}

// Function to log in an existing user
function logInUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User logged in successfully!");
      // Redirect the user to the home page or dashboard
      // Here you can add your own logic to redirect to the appropriate page
    })
    .catch((error) => {
      console.error("Error logging in user: ", error);
      // Show an error message to the user
      // Here you can add your own logic to display the error message to the user
    });
}

// Function to handle the login form submission
function handleLoginSubmit(event) {
  event.preventDefault();

  // Get the user's email and password from the form
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Call the logInUser function with the email and password
  logInUser(email, password);
}

// Add an event listener to the sign-up button
const signUpButton = document.querySelector("#signup");
signUpButton.addEventListener("click", handleSignUpSubmit);

// Add an event listener to the login button
const loginButton = document.querySelector("#login");
loginButton.addEventListener("click", handleLoginSubmit);