var cards = ['chameleon', 'chameleon', 'eagle', 'eagle', 'flamingo', 'flamingo', 'giraffe', 'giraffe', 'penguin', 'penguin', 'snail', 'snail'],
    cardsInPlay = [],
    cardsRemaining = 12;

var board = document.getElementById('game-board');

function createBoard() {

  shuffle(cards);
  for (var i = 0; i < cards.length; i++) {
    var newCard = document.createElement('div');
    newCard.classList.add('card', 'animated', 'flipInY');
    newCard.setAttribute('data-card', cards[i]);
    newCard.id = `card-${i}`;

    var back = document.createElement('div');
    back.classList.add('back');
    newCard.appendChild(back);

    var front = document.createElement('div');
    front.classList.add('front');
    front.setAttribute('style', `background-image: url(img/${cards[i]}.jpg`);
    newCard.appendChild(front);

    newCard.addEventListener('click', flipCard);
    board.appendChild(newCard);
  }
}

function flipCard() {
  var card = {
    animal: this.getAttribute('data-card'),
    id: this.id
  }
  if (cardsInPlay.length < 2) {
    this.firstChild.classList.add('animated', 'fadeOut');
    cardsInPlay.push(card);
  }
  window.setTimeout(evaluateCards, 1800);
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
        document.getElementById(card.id).firstChild.classList = 'back animated fadeIn';
      }
    });
    if (winner()) {
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
function winner() {
  return cardsRemaining === 0;
}

function resetGame() {
  clearBoard();
  createBoard();
  cardsRemaining = 12;
  cardsInPlay = [];
}
function clearBoard() {
  board.innerHTML = "";
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
