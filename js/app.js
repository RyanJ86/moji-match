/// List of all the cards
const emoji = ["em-svg em-sunglasses", "em-svg em-sunglasses", "em-svg em-stuck_out_tongue_winking_eye", "em-svg em-stuck_out_tongue_winking_eye", "em-svg em-stuck_out_tongue_closed_eyes", "em-svg em-stuck_out_tongue_closed_eyes", "em-svg em-weary", "em-svg em-weary", "em-svg em-relaxed", "em-svg em-relaxed", "em-svg em-angry", "em-svg em-angry", "em-svg em-joy", "em-svg em-joy", "em-svg em-heart_eyes", "em-svg em-heart_eyes"];
const cardsContainer = document.querySelector(".deck");
/// Arrays for opened & matched cards
let openedCards = [];
let matchedCards = [];
/// Shuffle the deck
shuffleArray(emoji);
/// Generate the deck
function init() {
  for (let i = 0; i < emoji.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card", "shufflecards");
    card.innerHTML = `<i class="${emoji[i]}"></i>`;
    cardsContainer.appendChild(card);
    /// Remove shuffle spin animation after ~.5 sec, otherwise cards keep spinning on mouseover
    setTimeout(function() {
      card.classList.remove("shufflecards");
    }, 600);
    ///Add click event to card
    click(card);
  }
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
}
/// Start game ///
init();
/// Win the Game ///
function winGame() {
  if (matchedCards.length === emoji.length)
    modal.style.display = "block";
  document.getElementById("moves").innerHTML = moves;
  document.getElementById("stars").innerHTML = starsContainer.innerHTML;
  document.getElementById("time").innerHTML = totalSeconds;
};
/// Timer
const timerContainer = document.querySelector(".timer");
let liveTimer,
  totalSeconds = 0;
// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds;

function startTimer() {
  liveTimer = setInterval(function() {
    // Increase the totalSeconds by 1
    totalSeconds++;
    // Update the HTML Container with the new time
    timerContainer.innerHTML = totalSeconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(liveTimer);
}
/// Score
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="em-svg em-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function score() {
  if (moves < 13) {
    starsContainer.innerHTML = star + star + star;
  } else if (moves < 19) {
    starsContainer.innerHTML = star + star;
  } else {
    starsContainer.innerHTML = star;
  }
}
/// Move counter
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
  /// Add to score counter
  score();
}
/// Card is clicked
let isFirstClick = true;
function click(card) {
  card.addEventListener("click", function() {
    /// Start Timer
    if (isFirstClick) {
      startTimer();
      isFirstClick = false;
    }
    const cardOne = this;
    const cardTwo = openedCards[0];
    /// A card was opened before
    if (openedCards.length === 1) {
      // Add classes to reveal card
      card.classList.add("open", "reveal", "notouch")
      openedCards.push(this);
      /// Compare the 2 cards
      /// Cards match
      if (cardOne.innerHTML === cardTwo.innerHTML) {
        //Adds match class to pairs with cool animation ;)
        cardOne.classList.add("match", "notouch");
        cardTwo.classList.add("match", "notouch");
        matchedCards.push(cardOne, cardTwo);
        //Reset the array after a match
        openedCards = [];
        // All 16 cards matched (game won)
        setTimeout(winGame, 1000);
        ///Cards don't match
      } else {
        cardOne.classList.remove("open", "reveal");
        cardTwo.classList.remove("open", "reveal");
        // Add nomatch class with cool animation ;)
        cardOne.classList.add("nomatch");
        cardTwo.classList.add("nomatch");
        // Have the nomatch animation run for 1 second, then remove it (makes the cards go back down)
        setTimeout(function() {
          cardOne.classList.remove("nomatch", "notouch");
          cardTwo.classList.remove("nomatch", "notouch");
        }, 1000);
      }
      /// Reset the array after no match
      openedCards = [];
      /// Increase move counter
      addMove();
    } else {
      /// No cards opened
      cardOne.classList.add("open", "reveal", "notouch");
      openedCards.push(this);
    }
  });
}
/// Reset function
function reset() {
  console.log("reset");
  /// Delete cards
  cardsContainer.innerHTML = "";
  /// Generate new cards
  init();
  /// Shuffle the deck
  shuffleArray(emoji);
  /// Reset variables
  /// Reset Score
  starsContainer.innerHTML = star + star + star;
  /// Reset Moves
  stopTimer();
  isFirstClick = true;
  totalSeconds = 0;
  timerContainer.innerHTML = totalSeconds;
  moves = 0;
  movesContainer.innerHTML = moves;
  matchedCards = [];
  openedCards = [];
}
/// Stop the timer
function stopTimer() {
  clearInterval(liveTimer);
}
/// Win message modal
const modal = document.getElementById('winModal');
function removeModal() {
  modal.style.display = "none";
}
