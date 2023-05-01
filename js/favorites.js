

//on favorites page, get all games associated with user id 

    //access database
    var userRef = firebase.database().ref('users/' + uid);
        userRef.push({
            games: ""
        })


    //get array of game id associated with user id

    //store id in variable

    //display array of games into cards/divs on favorites page


//when user is logged in favorites tab shows up

    //else hide when not logged in

//profile page when user is logged in