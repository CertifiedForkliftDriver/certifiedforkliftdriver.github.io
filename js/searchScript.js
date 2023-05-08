// Titles: https://api.rawg.io/api/games?key=165cef52ff124c82ae9fe6b59d64a946&search=${searchTerm}
// details: https://api.rawg.io/api/games/${game.dataset.id}?key=165cef52ff124c82ae9fe6b59d64a946`

const gameSearchBox = document.getElementById('game-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load games from API
async function loadGames(searchTerm){
    const URL = `https://api.rawg.io/api/games?key=165cef52ff124c82ae9fe6b59d64a946&search=${searchTerm}`;
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
        <a href="game-details.html?id=${games[idx].id}"><div class = "search-item-thumbnail">
            <img src = "${gamePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${games[idx].name}</h3>
                <p>${games[idx].released}</p>
        </div></a>
        `;
        searchList.appendChild(gameListItem);
    }
}

window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});