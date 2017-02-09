var cards = ['chameleon', 'chameleon', 'eagle', 'eagle', 'flamingo', 'flamingo', 'giraffe', 'giraffe', 'penguin', 'penguin', 'snail', 'snail'];
    cardsInPlay = [];

var gameBoard = document.getElementById('game-board');

function createBoard() {
  for (var i = 0; i < cards.length; i++) {
    var newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.setAttribute('data-card', cards[i]);
    newCard.addEventListener('click', isTwoCards);
    gameBoard.appendChild(newCard);
  }
}

function isMatch(arr) {
  return arr[0] === arr[1];
}

function flipCard() {

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
    cards.innerHTML = "";
    cardsInPlay = [];
  }
}

createBoard();
