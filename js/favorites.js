//user login
    
        import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
        import { getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js';
        //verify user is logged in/authentiaction
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        var firebaseConfig = {
            apiKey: "AIzaSyBP_8A81Fbfmake_3Qg_5KhWd6-1XtfM0k",
            authDomain: "gamebox-381701.firebaseapp.com",
            projectId: "gamebox-381701",
            storageBucket: "gamebox-381701.appspot.com",
            messagingSenderId: "745560099853",
            appId: "1:745560099853:web:5b2699432e6cfec03bd944",
            measurementId: "G-GC71CVBP6X"
        };

        //verify user is logged in/authentiaction
        
        const checkAuthState = async() => {
            onAuthStateChanged(auth, user => {
                if (user) {
                    // User is signed in, show the favorites tab
                    $('#favorites-tab').show();
                } else {
                    // User is signed out, hide the favorites tab
                     $('#favorites-tab').hide();
                }
            });
        }
        checkAuthState();
    


//get user data

//get current gameid

//submit game id to firebase, associated with user info

//when user is logged in favorites tab shows up

//profile page when user is logged in