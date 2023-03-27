// Titles: https://api.rawg.io/api/games?key=6070e88e166c424cb153bfa25affa500&search=${searchTerm}
// details: https://api.rawg.io/api/games/${game.dataset.id}?key=6070e88e166c424cb153bfa25affa500`

const gameSearchBox = document.getElementById('game-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load games from API
async function loadGames(searchTerm){
    const URL = `https://api.rawg.io/api/games?key=6070e88e166c424cb153bfa25affa500&search=${searchTerm}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //console.log(data);
    // check if search was successful using array lengths
    if(data.results.length > 0) displayGameList(data.results);
}

function findGames(){
    let searchTerm = (gameSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadGames(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayGameList(games){
    searchList.innerHTML = "";
    for(let idx = 0; idx < games.length; idx++){
        let gameListItem = document.createElement('div');
        gameListItem.dataset.id = games[idx].id; // setting game id in  data-id
        gameListItem.classList.add('search-list-item');
        if(games[idx].background_image != null)
            gamePoster = games[idx].background_image;
        else 
            gamePoster = "images/image_not_found.png";

        gameListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${gamePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${games[idx].name}</h3>
                <p>${games[idx].released}</p>
        </div>
        `;
        searchList.appendChild(gameListItem);
    }
    loadGameDetails();
}
    
function loadGameDetails(){
    const searchListGames = searchList.querySelectorAll('.search-list-item');
    searchListGames.forEach(game => {
        game.addEventListener('click', async () => {
            // console.log(game.dataset.id);
            searchList.classList.add('hide-search-list');
            gameSearchBox.value = "";
            const result = await fetch(`https://api.rawg.io/api/games/${game.dataset.id}?key=6070e88e166c424cb153bfa25affa500`);
            const gameDetails = await result.json();
            // console.log(gameDetails);
            displayGameDetails(gameDetails);
        });
    });
}

function displayGameDetails(details){
    resultGrid.innerHTML = `
    <div class = "game-poster">
        <img src = "${(details.background_image != null) ? details.background_image : "images/image_not_found.png"}" alt = "game poster">
    </div>
    <div class = "game-info">
        <h3 class = "game-title">${details.name}</h3>
        <p class = plot><b>Description:</b>${details.description}</p>
        <ul class = "game-misc-info">
            <li class = "rated">Ratings: ${details.rating}</li>
            <li class = "released">Released: ${details.released}</li>
        </ul>
        <p class = "genre"><b>Genres:</b> ${details.genres[0].name}</p>
    </div>
    `;
}

window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});