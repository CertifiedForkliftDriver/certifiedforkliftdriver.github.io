carousel = document.querySelector('.carousel');
const slideContainer = document.querySelector('.slider');
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

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');
  slide.appendChild(titleContainer);

  const slideTitle = document.createElement('h3');
  slideTitle.classList.add('slide-title');
  slideTitle.textContent = game.name;
  titleContainer.appendChild(slideTitle);

  const slideRating = document.createElement('div');
  slideRating.classList.add('slide-rating');
  const ratingStars = getRatingStars(game.rating);
   slideRating.appendChild(ratingStars);

  titleContainer.appendChild(slideRating);

  slideImage.addEventListener('click', async () => {
    const reviewsHTML = await getReviews(game);
    
    // Redirect to temporary HTML page
    const tempHTMLContent = `
      <div class="container">
        <h1 class="title">${game.name}</h1>
        <div class="rating">
          <span>Rating:</span>
          <span>${game.rating}</span>
        </div>
        ${reviewsHTML}
      </div>
    `;
    const tempWindow = window.open("", "_blank");
    tempWindow.document.write(tempHTMLContent);
  });

  slideContainer.appendChild(slide);
}

function getRatingStars(rating) {
  const ratingContainer = document.createElement('div');
  ratingContainer.classList.add('rating-container');

  const ratingStars = document.createElement('span');
  ratingStars.classList.add('rating-stars');
  const fullStars = Math.floor(rating);
  const halfStars = Mth.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;
  for (let i = 0; i < fullStars; i++) {
    const starIcon = document.createElement('i');
    starIcon.classList.add('fas', 'fa-star');
    ratingStars.appendChild(starIcon);
  }
  for (let i = 0; i < halfStars; i++) {
    const starIcon = document.createElement('i');
    starIcon.classList.add('fas', 'fa-star-half-alt');
    ratingStars.appendChild(starIcon);
  }
  for (let i = 0; i < emptyStars; i++) {
    const starIcon = document.createElement('i');
    starIcon.classList.add('far', 'fa-star');
    ratingStars.appendChild(starIcon);
  }
  
  const ratingNumber = document.createElement('span');
  ratingNumber.classList.add('rating-number');
  ratingNumber.textContent = rating.toFixed(1);
  
  ratingContainer.appendChild(ratingStars);
  ratingContainer.appendChild(ratingNumber);
  
  return ratingContainer;
}

// get reviews for a game
async function getReviews(game) {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${game.id}/reviews?key=6070e88e166c424cb153bfa25affa500`);
    const data = await response.json();
    console.log(data.results); // added for debugging purposes
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
  const gameNames = ["Assassin's Creed", "Minecraft", "Grand Theft Auto V", "Super Mario Odyssey", "FIFA 22", "God of War I", "Fortnite Battle Royale", "Apex Legends"];
  const gameDataPromises = gameNames.map(getGameData);
  const gameData = await Promise.all(gameDataPromises);
  gameData.forEach(game => {
    createSlide(game);
  });
}
const slides = document.querySelectorAll(".slide");

initCarousel();

