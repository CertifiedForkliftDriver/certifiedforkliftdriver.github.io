


//get current game id/favorite/click favorite function

    //when click get game id,

        //get user firebase id

        //associate game with user id

        //store in firebase firestore
        import { initializeApp } from "firebase/app";
        import { getDatabase } from "firebase/database";
        
        const firebaseConfig = {
            apiKey: "AIzaSyBP_8A81Fbfmake_3Qg_5KhWd6-1XtfM0k",
            authDomain: "gamebox-381701.firebaseapp.com",
            projectId: "gamebox-381701",
            storageBucket: "gamebox-381701.appspot.com",
            messagingSenderId: "745560099853",
            appId: "1:745560099853:web:5b2699432e6cfec03bd944",
            measurementId: "G-GC71CVBP6X",
            databaseURL: "https://gamebox-381701-default-rtdb.firebaseio.com",
        };
        
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        
        // Initialize Realtime Database and get a reference to the service
        const database = getDatabase(app);

        //write to firebase
        function writeUserData(userId, gameIDs, profilePic) {
            firebase.database().ref('users/' + userId).set({
              favorites: gameIDs,
              profile_picture : profilePic
            });
          }

//on favorites page, get all games associated with user id 

    //access database

    //get array of game id associated with user id

    //store id in variable

    //display array of games into cards/divs on favorites page


//when user is logged in favorites tab shows up

    //else hide when not logged in

//profile page when user is logged in