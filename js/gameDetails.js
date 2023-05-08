// We need this file in order to display games as a separate html file (same window though)



const gameDetailsContainer = document.getElementById('gameContainer');

async function loadGameDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const result = await fetch(`https://api.rawg.io/api/games/${gameId}?key=165cef52ff124c82ae9fe6b59d64a946`);
    const gameDetails = await result.json();
    const screenshotLink = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=165cef52ff124c82ae9fe6b59d64a946`);
    const gameScreenshots = await screenshotLink.json();
    displayGameDetails(gameDetails, gameScreenshots);
    
}



function displayGameDetails(details, screenshots){
    // gameDetailsContainer.innerHTML = `
    // <div class = "game-poster">
    //     <img src = "${(details.background_image != null) ? details.background_image : "images/image_not_found.png"}" alt = "game poster">
    // </div>
    // <div class = "game-info">
    //     <h3 class = "game-title">${details.name}</h3>
    //     <p class = plot><b>Description:</b>${details.description}</p>
    //     <ul class = "game-misc-info">
    //         <li class = "rated">Ratings: ${details.rating}</li>
    //         <li class = "released">Released: ${details.released}</li>
    //     </ul>
    //     <p class = "genre"><b>Genres:</b> ${details.genres[0].name}</p>
    // </div>
    // `;
    gameDetailsContainer.innerHTML = `
    <div class="banner mb-3" >
        <div class="game-image-container">
        <img src="${screenshots.results[3].image}">
        </div>
        <div class="box">
            
            <img src="${(details.background_image != null) ? details.background_image : "images/image_not_found.png"}" alt = "game poster">
            <div class="text">
            <h3 class= "game-title">${details.name}</h3>
            <p>Rating: ${details.rating}</p>
            <p>
               Released: ${details.released}
            </p>
            <button id="fav-btn" class="action_btn" href="html/favorites.html">Favorite Game</button>
            </div>
        </div>
    </div>
    <div class="log mb-3">
        <div class="pic mb-3">
            <img src="${screenshots.results[0].image}" >
            <img src="${screenshots.results[1].image}" >
        </div>
        <div class="tit mb-3">Description</div>
        <p class="mb-3">
            ${details.description}
        </p>
    </div>
    <div class="user mb-3">
        <div class="item">
            <h1>Developer</h1>
            <img src="${details.developers[0].image_background}">
            <h3>${details.developers[0].name}</h3>
        </div>
    </div>
    
    
    `
}


loadGameDetails();



/* <div class="user mb-3">
        <div class="item">
            <h1>Developer</h1>
            <img src="${details.developers[0].image_background}">
            <h3>${details.developers[0].name}</h3>
        </div>
    </div> */

/*<div class="game-info">
                <h3 class = "game-title">${details.name}</h3>
                <ul class = "game-misc-info">
                    <li class = "rated">Rating: ${details.rating}</li>
                    <li class = "released">Released: ${details.released}</li>
                </ul>
                <p>${details.genres[0].name} | ${details.genres[1].name}</p>
            </div>*/


//favorite function 
