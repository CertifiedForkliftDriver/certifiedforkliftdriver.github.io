const gameDetailsContainer = document.getElementById('gameContainer');
const apiKey = '6070e88e166c424cb153bfa25affa500';

const apiEndpoint = 'https://api.rawg.io/api/games?key=6070e88e166c424cb153bfa25affa500';
async function loadGameDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const result = await fetch(`https://api.rawg.io/api/games/${gameId}?key=6070e88e166c424cb153bfa25affa500`);
    const gameDetails = await result.json();
    const screenshotLink = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=6070e88e166c424cb153bfa25affa500`);
    const gameScreenshots = await screenshotLink.json();
    displayGameDetails(gameDetails, gameScreenshots);
    
}
async function getGameDevelopers(gameId) {
    const response = await fetch(`https://api.rawg.io/api/games/${gameId}/development-team?key=6070e88e166c424cb153bfa25affa500`);
    const data = await response.json();
    return data.results.map(result => ({
      name: result.name,
      image: result.image,
    }));
  }

  function getScreenshotUrl(screenshots, index, fallback = "images/image_not_found.png") {
    if (screenshots.results[index]) {
      return screenshots.results[index].image;
    }
    return fallback;
  }


    function getRatingClass(score, isMetacritic = false) {
        if (isMetacritic) {
          if (score >= 85) {
            return "rating-green";
          }else if (score < 85 && score >= 75) {
            return "rating-lightgreen";
          } else if (score < 75 && score >= 60) {
            return "rating-orange";
          } else {
            return "rating-red";
          }
        } else {
          if (score >= 4.5) {
            return "rating-green";
          } else if (score >= 4.0) {
            return "rating-lightgreen";
          } else if (score >= 3) {
            return "rating-orange";
          } else {
            return "rating-red";
          }
        }
      }
  
async function displayGameDetails(details, screenshots){
  const developers = await getGameDevelopers(details.id);  
    gameDetailsContainer.innerHTML = `
    <div class="banner mb-3">
    <div class="game-image-container">
    <img src="${(details.background_image != null) ? details.background_image : "images/image_not_found.png"}" alt = "game poster">
        </div>
        <div class="box">
        
            <div class="text">
            <h3 class= "game_title">${details.name}</h3>
            <p class="rating-text">Rating: <span class="${getRatingClass(details.rating)}">${details.rating}</span></p>
<p class="rating-text">Metacritic: <span class="${getRatingClass(details.metacritic, true)}">${details.metacritic}</span></p>
            <p>Genre: ${
                (details.genres && details.genres.length > 0)
                  ? details.genres.map(genre => genre.name).join(" / ")
                  : "N/A"
              }</p>
            <p>
               Released: ${(details.released !=null) ? details.released: "N/A"}
            </p>
            <p>Platforms: ${details.platforms.map(platform => platform.platform.name).join(', ')}</p>
            <button class="btn1" href="html/favorites.html">Favorite Game</button>
            </div>
        </div>
    </div>
    <div class="log mb-3">
<div class="pic mb-3">
<img src="${getScreenshotUrl(screenshots, 0)}">
<img src="${getScreenshotUrl(screenshots, 1)}">
<img src="${getScreenshotUrl(screenshots, 2)}">
<img src="${getScreenshotUrl(screenshots, 3)}">
<img src="${getScreenshotUrl(screenshots, 4)}">
</div>

               
        <div class="tit mb-3">Description</div>
        <p class="mb-3">
            ${details.description}
        </p>
    </div>`
    if (developers.length > 0) {
        let developersHtml = `<div class="user mb-3">`;
    
        // Get up to the first 4 developers and loop through them
        developers.slice(0, 4).forEach(developer => {
          developersHtml += `
          
            
              <div class="item">
                <img src="${developer.image}">
                <h3>${developer.name}</h3>
                <span>Game engineer</span>
                <div class="developers-info">
            <p>These are the developers who have worked on this game.</p>
            </div>  
            </div>
           
           
          `;
        });
    
        developersHtml += '</div>';
        gameDetailsContainer.innerHTML += developersHtml;
      } else {
        // Display a "No developer info" message when there are no developers
        gameDetailsContainer.innerHTML += `
          <div class="no-dev-info">
            <p>No developer info</p>
          </div>
        `;
      }
    
    
}


loadGameDetails();
