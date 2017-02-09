var cards = ['chameleon', 'chameleon', 'eagle', 'eagle', 'flamingo', 'flamingo', 'giraffe', 'giraffe', 'penguin', 'penguin', 'snail', 'snail'];
cardsInPlay = [];

var gameBoard = document.getElementById('game-board');

function createBoard() {
  shuffle(cards);
  for (var i = 0; i < cards.length; i++) {
    var newCard = document.createElement('div');
    newCard.classList.add('card');
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
    gameBoard.appendChild(newCard);
  }
}

function flipCard() {
  for (var j = 0; j < cardsInPlay.length; j++) {
    if (cardsInPlay[j].id === this.id) {
      this.firstChild.classList.remove('hidden');
      cardsInPlay.splice(j, 1);
      return;
    }
  }
  var card = {
    animal: this.getAttribute('data-card'),
    id: this.id
  }

  this.classList.add('in-play');
  this.firstChild.classList.add('hidden');
  cardsInPlay.push(card);

  if (cardsInPlay.length === 2 && isMatch(cardsInPlay)) {
    //matched! "remove" cards and increment score
    var matchedCards = document.getElementsByClassName('in-play');
    for (var i = matchedCards.length - 1; i >= 0; i--) {
      matchedCards[i].classList.add('animated', 'flipOutY');
      matchedCards[i].classList.remove('in-play');
    }
    cardsInPlay = [];

  } else if (cardsInPlay.length === 2) {
    //not a match, reset cards
    var unmatchedCards = document.getElementsByClassName('in-play');
    for (var i = unmatchedCards.length - 1; i >= 0; i--) {
      unmatchedCards[i].firstChild.classList.remove('hidden');
      unmatchedCards[i].classList.remove('in-play');
    }
    cardsInPlay = [];
  }
}

function isMatch(arr) {
  return arr[0].animal === arr[1].animal;
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
