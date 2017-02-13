var cards = ['chameleon', 'chameleon', 'eagle', 'eagle', 'flamingo', 'flamingo', 'giraffe', 'giraffe', 'penguin', 'penguin', 'snail', 'snail'],
    cardsInPlay = [],
    cardsRemaining = 12,
    startTime,
    timerRequest;

var board = document.getElementById('game-board'),
    timer = document.getElementById('timer');


document.getElementById('reset-btn').addEventListener('click', resetGame);
document.getElementById('instructions-btn').addEventListener('click', displayModal);

function createBoard() {

  shuffle(cards);
  cards.forEach(function(card, index) {
    var newCard = document.createElement('div');
    newCard.classList.add('card', 'animated', 'flipInY');
    newCard.setAttribute('data-card', card);
    newCard.id = `card-${index}`;

    var back = document.createElement('div');
    back.classList.add('back');
    newCard.appendChild(back);

    var front = document.createElement('div');
    front.classList.add('front');
    front.setAttribute('style', `background-image: url(img/${card}.jpg`);
    newCard.appendChild(front);

    newCard.addEventListener('click', flipCard);
    board.appendChild(newCard);
  });
}

function flipCard() {
  //start timer on first card flip
  if (!startTime) {
    startTime = Date.now();
    computeTimeElapsed();
  }
  var card = {
    animal: this.getAttribute('data-card'),
    id: this.id
  }
  if (cardsInPlay.length < 2) {
    this.firstChild.classList.add('animated', 'flipOutY');
    cardsInPlay.push(card);
  }
  window.setTimeout(evaluateCards, 1500);
}

function evaluateCards() {
  if (cardsInPlay.length !== 2) {
    return;
  } else {
    cardsInPlay.forEach(function(card) {
      if (isMatch(cardsInPlay) && !isSameCard(cardsInPlay)) {
        document.getElementById(card.id).classList = 'card animated flipOutY';
        cardsRemaining--;
      } else {
        document.getElementById(card.id).firstChild.classList = 'back animated flipInY';
      }
    });
    if (isWinner()) {
      if (window.confirm("Congratulations! You won! Would you like to play again?")) {
        resetGame();
      }
    }
    cardsInPlay = [];
  }
}

function isMatch(cards) {
  return cards[0].animal === cards[1].animal;
}
function isSameCard(cards) {
  return cards[0].id === cards[1].id;
}
function isWinner() {
  return cardsRemaining === 0;
}
function computeTimeElapsed() {
  var currentTime = Date.now(),
      elapsedTime = new Date(currentTime - startTime);

  var milliseconds = elapsedTime.getUTCMilliseconds(),
      seconds = elapsedTime.getUTCSeconds(),
      minutes = elapsedTime.getUTCMinutes();

  //time formatting
  //TODO: break out into function
  if (milliseconds < 10) {
    milliseconds = '00' + milliseconds;
  } else if (milliseconds < 100) {
    milliseconds = '0' + milliseconds;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  timer.textContent = `${minutes}:${seconds}.${milliseconds}`;
  timerRequest = window.requestAnimationFrame(computeTimeElapsed);
}

function resetGame() {
  clearBoard();
  createBoard();
  resetTimer();
  cardsRemaining = 12;
  cardsInPlay = [];

}
function clearBoard() {
  board.innerHTML = "";
}
function displayModal() {

}
function resetTimer() {
  startTime = null;
  window.cancelAnimationFrame(timerRequest);
  timer.textContent = "00:00.000";
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

createBoard();
