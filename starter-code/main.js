var cards = ['queen', 'queen', 'king', 'king'],
    cardsInPlay = [];

var gameBoard = document.getElementById('game-board');

function createBoard() {
  for (var i = 0; i < cards.length; i++) {
    var newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.setAttribute('data-card', cards[i]);
    newCard.addEventListener('click', isTwoCards);
    gameBoard.appendChild(newCard);
  }
}

function isMatch(arr) {
  return arr[0] === arr[1];
}

function isTwoCards() {
  if (this.getAttribute('data-card') === 'king') {
    this.innerHTML = '<img src="king.png" alt="King">';
  } else {
    this.innerHTML = '<img src="queen.png" alt="Queen">';
  }
  cardsInPlay.push(this.getAttribute('data-card'));
  if (cardsInPlay.length === 2) {
    isMatch(cardsInPlay);
    var cards = document.getElementsByClassName('card');
    console.log(cards);
    cards.innerHTML = "";
    console.log(cards);
    cardsInPlay = [];
  }
}

createBoard();
