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
function handleFormSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Determine whether the user is logging in or signing up
  if (loginBtn.textContent === 'Log In') {
    // Log in the user
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // User logged in successfully, do something
        console.log('User logged in:', userCredential.user);
      })
      .catch(error => {
        // Handle login error
        console.error('Login error:', error.message);
      });
  } else {
    // Sign up the user
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // User signed up successfully, do something
        console.log('User signed up:', userCredential.user);
      })
      .catch(error => {
        // Handle signup error
        console.error('Signup error:', error.message);
      });
  }
}

// Function to toggle between login and signup modes
function toggleMode() {
  if (loginBtn.textContent === 'Log In') {
    loginBtn.textContent = 'Sign Up';
    signupBtn.textContent = 'Log In';
  } else {
    loginBtn.textContent = 'Log In';
    signupBtn.textContent = 'Sign Up';
  }
}

// Add event listeners to the login and signup buttons
loginBtn.addEventListener('click', handleFormSubmit);
signupBtn.addEventListener('click', toggleMode);
