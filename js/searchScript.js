// Titles: https://api.rawg.io/api/games?key=6070e88e166c424cb153bfa25affa500&search=${searchTerm}
// details: https://api.rawg.io/api/games/${movie.dataset.id}?key=6070e88e166c424cb153bfa25affa500`

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://api.rawg.io/api/games?key=6070e88e166c424cb153bfa25affa500&search=${searchTerm}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //console.log(data);
    // check if search was successful using array lengths
    if(data.results.length > 0) displayMovieList(data.results);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].id; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].background_image != null)
            moviePoster = movies[idx].background_image;
        else 
            moviePoster = "images/image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].name}</h3>
                <p>${movies[idx].released}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}
    
function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`https://api.rawg.io/api/games/${movie.dataset.id}?key=6070e88e166c424cb153bfa25affa500`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.background_image != null) ? details.background_image : "images/image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.name}</h3>
        <p class = plot><b>Description:</b>${details.description}</p>
        <ul class = "movie-misc-info">
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