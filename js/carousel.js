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
        <link rel="stylesheet" href="css/footer.css">

        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
        <header>
            <div class="navbar">
                <a href="../index.html">
                    <img src="../logo/logo.png">
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
                    <img src="../images/1.jpeg">
                    <div class="text">
                        <h3>OverKill (DNF：OverKill)</h3>
                        <p>operator: Neople</p>
                        <p>
                            <a href="#">windows</a>
                            <a href="#">mac</a>
                        </p>
                        <button class="btn">Edit Game</button>
                    </div>
                </div>
            </div>
            <div class="log mb-3">
                <div class="pic mb-3">
                    <img src="../images/2.jpg" alt="">
                    <img src="../images/3.jpg" alt="">
                </div>
                <div class="tit mb-3">Game Introduction</div>
                <p class="mb-3">
                    NEXON and Neople announced the launch of OVERKILL, a new ARPG in the DNF IP series. The game will use Unreal 4 engine architecture, using the classic Dungeon&Fighter game IP, to achieve a new transformation from 2D to 3D, to show players a new perspective
                    of the mysterious and revitalized land of Arad.
                </p>
                <div>
                    <a href="#" class="bage">3D</a>
                    <a href="#" class="bage">Horizontal board</a>
                </div>
            </div>
            <div class="user mb-3">
                <div class="item">
                    <img src="../images/3.jpg" alt="">
                    <h3>Joshau</h3>
                    <span>Game engineer</span>
                    <p>
                        
                    </p>
                </div>
                <div class="item">
                    <img src="../images/1.jpeg" alt="">
                    <h3>Lis</h3>
                    <span>Game engineer</span>
                    <p>
                        
                    </p>
                </div>
                <div class="item">
                    <img src="../images/2.jpg" alt="">
                    <h3>Aric</h3>
                    <span>Game engineer</span>
                    <p>
                        Good at writing game programs and writing good. This game wants you to like
                    </p>
                </div>
                <div class="item">
                    <img src="../images/1.jpeg" alt="">
                    <h3>ssil</h3>
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
        <script src="js/menu.js"></script>
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
  const gameNames = ["Assassin's Creed", "Minecraft", "Grand Theft Auto V", "Super Mario Odyssey", "FIFA 22", "God of War I", "Fortnite Battle Royale", "Apex Legends"];
  const gameDataPromises = gameNames.map(getGameData);
  const gameData = await Promise.all(gameDataPromises);
  gameData.forEach(game => {
    createSlide(game);
  });
}
const slides = document.querySelectorAll(".slide");

initCarousel();
