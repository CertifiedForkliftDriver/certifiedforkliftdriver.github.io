const carousel = document.querySelector('.carousel');
const slideContainer = document.querySelector('.slider');
const tempHTML = document.querySelector('#tempHTML');
const apiEndpoint = 'https://api.rawg.io/api/games?key=6070e88e166c424cb153bfa25affa500';

// fetch data from API for a specific game
async function getGameData(gameName) {
  try {
    const response = await fetch(`${apiEndpoint}&search=${gameName}`);
    const data = await response.json();
    return data.results.find(game => game.name === gameName);
  } catch (error) {
    console.log(error);
  }
}

// create carousel slide for each game
async function createSlide(game) {
  const slide = document.createElement('div');
  slide.classList.add('slide');

  const slideImage = document.createElement('img');
  slideImage.classList.add('slide-image');
  slideImage.src = game.background_image;
  slideImage.alt = game.name;
  slide.appendChild(slideImage);

  const slideTitle = document.createElement('h3');
  slideTitle.classList.add('slide-title');
  slideTitle.textContent = game.name;
  slide.appendChild(slideTitle);

  slideContainer.appendChild(slide);

  slideImage.addEventListener('click', async () => {
    const reviews = await getReviews(game);
    const tempHTMLContent = `
      <div class="container">
        <h1 class="title">${game.name}</h1>
        <div class="rating">
          <span>Rating:</span>
          <span>${game.rating}</span>
        </div>
        <div class="reviews">
          ${reviews}
        </div>
        <a href="#" class="back-btn">Back to carousel</a>
      </div>
    `;
    tempHTML.innerHTML = tempHTMLContent;
    carousel.style.display = 'none';
    tempHTML.style.display = 'block';
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', () => {
      tempHTML.style.display = 'none';
      carousel.style.display = 'block';
    });
  });
}

// get reviews for a game
async function getReviews(game) {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${game.id}/reviews?key=6070e88e166c424cb153bfa25affa500`);
    const data = await response.json();
    const reviews = data.results;
    let reviewHTML = '';
    if (reviews.length > 0) {
      reviewHTML += `<h3>Reviews:</h3>`;
      reviews.forEach(review => {
        reviewHTML += 
        `<div class="review">
          <h4>${review.user.username} says:</h4>
          <p>${review.text}</p>
          <div class="rating">Rating: ${review.rating}/5</div>
        </div>`;
      });
    } else {
      reviewHTML = `<p>No reviews found for this game.</p>`;
    }
    return reviewHTML;
  } catch (error) {
    console.log(error);
    return `<p>Unable to fetch reviews for this game.</p>`;
  }
}



async function initCarousel() {
  const gameNames = ["Assassin's Creed", "Minecraft", "Grand Theft Auto V", "Super Mario Odyssey", "FIFA 22", "NBA 2K22", "Madden NFL 22", "Super Mario"];
  const gameDataPromises = gameNames.map(getGameData);
  const gameData = await Promise.all(gameDataPromises);
  gameData.forEach(game => {
    createSlide(game);
  });
}

initCarousel();
