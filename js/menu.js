 
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

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js"
  import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js"
  // Initialize Firebase


  const app = firebase.initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  const auth = getAuth(app)

  // Initialize Firebase
  var firebaseConfig = {
            apiKey: "AIzaSyBP_8A81Fbfmake_3Qg_5KhWd6-1XtfM0k",
            authDomain: "gamebox-381701.firebaseapp.com",
            projectId: "gamebox-381701",
            storageBucket: "gamebox-381701.appspot.com",
            messagingSenderId: "745560099853",
            appId: "1:745560099853:web:5b2699432e6cfec03bd944",
            measurementId: "G-GC71CVBP6X"
  };


  // Get references to the email and password fields
  // Get input fields and buttons
  var emailField = document.getElementById("email")
  var passwordField = document.getElementById("password")
  var loginBtn = document.getElementById("login-btn")
  var signupBtn = document.getElementById("signup-btn")

  // Add login event listener
  loginBtn.addEventListener("click", function() {
    var email = emailField.value
    var password = passwordField.value

    // Validate email and password
    if (email === "" || password === "") {
      alert("Please enter an email and password.")
      return
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function() {
        // Redirect to the dashboard page
        window.location.href = "dashboard.html"
      })
      .catch(function(error) {
        // Handle login error
        var errorCode = error.code
        var errorMessage = error.message
        console.log("Error: " + errorCode + " - " + errorMessage);
      });
  });

  // Add signup event listener
  signupBtn.addEventListener("click", function() {
    var email = emailField.value
    var password = passwordField.value

    // Validate email and password
    if (email === "" || password === "") {
      alert("Please enter an email and password.")
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.")
      return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
        // Redirect to the dashboard page
        window.location.href = "dashboard.html";
      })
      .catch(function(error) {
        // Handle signup error
        var errorCode = error.code
        var errorMessage = error.message
        console.log("Error: " + errorCode + " - " + errorMessage);
      });
  });


