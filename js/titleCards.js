const cardsContainer = document.querySelector('#cards-container');

fetch('https://api.rawg.io/api/games?dates=2023-06-01,2024-12-31&ordering=-added&key=6070e88e166c424cb153bfa25affa500')
.then(response => response.json())
.then(topGame => {
    renderGames(topGame.results)
});

function renderGames(topGames) {
    topGames.forEach((topGame) => {
      const div = document.createElement('div');
      const image = document.createElement('img');
      const title = document.createElement('h2');
      const released = document.createElement('h4');
      const genres = document.createElement('h4');
      const rating = document.createElement('h4');
      const game_page = document.createElement('button');
      
      game_page.setAttribute('data-game-id', topGame.id);

      div.classList = 'card'
      image.classList = 'card-img'
      game_page.classList = 'empty'
      sessionStorage.setItem('gameId', topGame.id);
      game_page.onclick = getGameLink = (event) => {
        const gameId = event.target.getAttribute('data-game-id');
        const url = `game-details.html?id=${gameId}`;
        window.location.href = url;
      }
  
      image.src = topGame.background_image
      title.innerText = `${topGame.name}`
      released.innerText =`Release Date: ${topGame.released}`
      
      // Use a for...of loop to concatenate genres into a single string
      let genreString = '';
      for (const genre of topGame.genres) {
        genreString += genre.name + ' | ';
      }
      genres.innerText = genreString.slice(0, -3); // remove the last ' | ' separator

      if (topGame.rating == 0){
        rating.innerText = 'Rating: N/A'
      } else {
        rating.innerText = `Rating: ${topGame.rating}`
      }
      game_page.textContent = 'View Game Info'
  
      div.appendChild(image)
      div.appendChild(title)
      div.appendChild(released)
      div.appendChild(genres)
      div.appendChild(rating)
      div.appendChild(game_page)
      cardsContainer.appendChild(div)

    });
}