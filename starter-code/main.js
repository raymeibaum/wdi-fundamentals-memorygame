var cardOne = 'queen',
    cardTwo = 'queen',
    cardThree = 'king',
    cardFour = 'king';

var gameBoard = document.getElementById('game-board');

// if (cardOne === cardTwo) {
//   alert('You found a match!');
// } else {
//   alert('Sorry, try again.');
// }

function createCards() {
  for (var i = 0; i < 4; i++) {
    var newCard = document.createElement('div');
    newCard.className = 'card';
    gameBoard.appendChild(newCard);
  }
}

createCards();
