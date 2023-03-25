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

// Initialize Firebase
const firebaseConfig = {
  // your firebase configuration here
};

firebase.initializeApp(firebaseConfig);

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