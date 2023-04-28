carousel = document.querySelector('.carousel');
const slideContainer = document.querySelector('.slider');

const apiKey = '6070e88e166c424cb153bfa25affa500';

const apiEndpoint = 'https://api.rawg.io/api/games?key=6070e88e166c424cb153bfa25affa500';
const gameDataCache = {};
const profilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

async function getGameData(gameName) {
  try {
    if (gameDataCache[gameName]) {
      // if the game data is already in the cache, return it
      return gameDataCache[gameName];
    } else {
      const response = await fetch(`${apiEndpoint}&search=${gameName}`);
      const data = await response.json();
      const gameData = data.results.find(game => game.name === gameName);
      gameDataCache[gameName] = gameData; // store the game data in the cache
      return gameData;
    }
  } catch (error) {
    console.log(error);
  }
}

async function displayGameReviews(gameId) {
  try {
    const reviewsResponse = await fetch(`${apiEndpoint}/${gameId}/reviews`);
    const reviewsData = await reviewsResponse.json();
    const reviews = reviewsData.results;
    let reviewString = "";
    reviews.forEach(review => {
      reviewString += `<p>${review.summary}</p>`;
    });
    return reviewString;
  } catch (error) {
    console.log(error);
  }
}

async function displayReviewsHTML(gameId) {
  const reviewsHTML = await displayGameReviews(gameId);
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = reviewsHTML;
}




async function getGameInfo(gameId) {
  const apiKey = '6070e88e166c424cb153bfa25affa500';
  const apiUrl = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const gameInfo = {
    // add any other properties you need here
    name: data.name,
    description: data.description,
    rating: data.rating,
    released: data.released,
    background_image: data.background_image,
    genres: data.genres,
    developers: data.developers.name
    
  };

  return gameInfo;
}
async function getGameDeveloper(gameId, index) {
  const response = await fetch(`https://api.rawg.io/api/games/${gameId}/development-team?key=6070e88e166c424cb153bfa25affa500`);
  const data = await response.json();
  const developerName = data.results[index].name;
  return developerName;
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
    <!DOCTYPE html>
    <html lang="en">
    <head></head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
         integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
         crossorigin="anonymous" referrerpolicy="no-referrer"/>
    
        <title>GameBox Database</title>
        <link rel="icon" href="../favicon/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="footer.css">
    
        <link rel="stylesheet" href="gamebox.css">
    </head>
    
    <body>
        <header>
            <div class="navbar">
                <a href="../index.html">
                    <img src="https://raw.githubusercontent.com/CertifiedForkliftDriver/certifiedforkliftdriver.github.io/main/logo/logo.png">
                </a>
                <div class="logo"><a href="../index.html">GameBox Database</a></div>
                <ul class="links">
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="./about.html">About</a></li>
                    <li><a href="./top250.html">Top 250 Games</a></li>
                    <li><a href="./contact.html">Contact</a></li>
                </ul>
                <a href="./login.html" class="action_btn">Login</a>
                <div class="toggle_btn">
                    <i class="fa-solid fa-bars"></i>
                </div>
            </div>
    
            <div class="dropdown_menu">
                <li><a href="../index.html">Home</a></li>
                <li><a href="./about.html">About</a></li>
                <li><a href="./top250.html">Top 250 Games</a></li>
                <li><a href="./contact.html">Contact</a></li>
                <li><a href="./login.html" class="action_btn">Get Started</a></li>
                
            </div>
        </header>
    
        <main class="content w">
            <div class="banner mb-3">
                <div class="box">
                    <div class="game-img"><img src=${game.background_image}></div>
                    <div class="text">
                        <h3>${game.name}</h3>
                        <p>Rating: ${game.rating}</p>
                        <p>Metacritic Score: ${game.metacritic}</p>
                        <p> Release Date: ${game.released}</p>
                        <strong>Platforms: </strong>${game.platforms.map(platform => platform.platform.name).join(', ')}
                       <p></p>
                       <p></p>
                       <p></p>
                        <button class="btn">Add to Favorites</button>
                    </div>
                </div>
            </div>
            <div class="log mb-3">
                   <style>
    .pic {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: none; /* Hide scrollbar on Firefox */
        -ms-overflow-style: none; /* Hide scrollbar on Internet Explorer and Edge */
    }
    .pic::-webkit-scrollbar {
        display: none; /* Hide scrollbar on Chrome and Safari */
    }
    .pic img {
        margin-right: 10px;
        width: 200px;
        height: 120px;
        object-fit: cover;
    }
</style>
<div class="pic mb-3">
    ${game.short_screenshots.map(screenshot => `
        <img src="${screenshot.image}" alt="${game.name} Screenshot">
    `).join('')}
</div>

                </div>
                <div class="tit mb-3">Game Introduction</div>
                <div class="description">${await getGameInfo(game.id).then(info => info.description)}</div>

           
            
            <div class="user mb-3">
                <div class="item">
                <img src= "${profilePic}">
                    <h3>
                    ${await getGameDeveloper(game.id, 0)}
                    </h3>
                    <span>Game engineer</span>
                    
                    <p>
                    Good at writing game programs and writing good. This game wants you to like
                </p>


                </div>
                <div class="item">
                <img src= "${profilePic}">
                    <h3>${await getGameDeveloper(game.id, 1)}</h3>
                    <span>Game engineer</span>
                    <p>
                        Good at writing game programs and writing good. This game wants you to like
                    </p>
                </div>
                <div class="item">
                <img src= "${profilePic}">
                    <h3>${await getGameDeveloper(game.id, 2)}</h3>
                    <span>Game engineer</span>
                    <p>
                        Good at writing game programs and writing good. This game wants you to like
                    </p>
                </div>
                <div class="item">
                <img src= "${profilePic}">
                    <h3>${await getGameDeveloper(game.id, 3)}</h3>
                    <span>Game engineer</span>
                    <p>
                        Good at writing game programs and writing good. This game wants you to like
                    </p>
                </div>
        
            </div>
        </main>
        <footer>
            <div class="footer-content">
                <h3>GameBox Database</h3>
                <p>Enter The Realm Of Impossiblity</p>
                <ul class="socials">
                    <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fa-brands fa-tiktok"></i></a></li>
                    <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
                    <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                </ul>
            </div>
            <div class="footer-bottom">
                <p>copyright &copy;2023 GameBox Database</p>
            </div>
        </footer>
        <script src="menu.js"></script>
    </body>
    </html>    
      
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
  const halfStars = Math.ceil(rating - fullStars);
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
  const gameNames = [ "Overwatch", "Portal 2", "Dota 2", "Grand Theft Auto V", "Super Mario Odyssey", "FIFA 22", "God of War I","Assassin's Creed", "Minecraft"];
  const gameDataPromises = gameNames.map(getGameData);
  const gameData = await Promise.all(gameDataPromises);
  gameData.forEach(game => {
    createSlide(game);
  });
}
const slides = document.querySelectorAll(".slide");

initCarousel();

