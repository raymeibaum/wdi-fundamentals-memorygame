var cards = ['chameleon', 'chameleon', 'eagle', 'eagle', 'flamingo', 'flamingo', 'giraffe', 'giraffe', 'penguin', 'penguin', 'snail', 'snail'],
    cardsInPlay = [];

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

  this.firstChild.classList.add('animated', 'fadeOut');


  window.setTimeout(function(){
    cardsInPlay.push(card);
    if (cardsInPlay.length === 2 && isSameCard(cardsInPlay)) {
      this.firstChild.classList.remove('fadeOut');
      this.firstChild.classList.add('fadeIn');
      cardsInPlay = [];
    } else if (cardsInPlay.length === 2 && isMatch(cardsInPlay)) {
      for (var i = cardsInPlay.length - 1; i >= 0; i--) {
        document.getElementById(cardsInPlay[i].id).classList.remove('flipInY');
        document.getElementById(cardsInPlay[i].id).classList.add('flipOutY');
      }
      cardsInPlay = [];
    } else if (cardsInPlay.length === 2) {
      for (var j = cardsInPlay.length - 1; j >= 0; j--) {
        console.log(cardsInPlay[j].id);
        document.getElementById(cardsInPlay[j].id).firstChild.classList.remove('fadeOut');
        document.getElementById(cardsInPlay[j].id).firstChild.classList.add('fadeIn');
      }
      cardsInPlay = [];
    }
  }, 1500);

  // if (cardsInPlay.length === 2 && isSameCard(cardsInPlay)) {
  //   this.firstChild.classList.remove('fadeOut');
  //   this.firstChild.classList.add('fadeIn');
  //   cardsInPlay = [];
  // } else if (cardsInPlay.length === 2 && isMatch(cardsInPlay)) {
  //   for (var i = cardsInPlay.length - 1; i >= 0; i--) {
  //     document.getElementById(cardsInPlay[i].id).classList.remove('flipInY');
  //     document.getElementById(cardsInPlay[i].id).classList.add('flipOutY');
  //   }
  //   cardsInPlay = [];
  // } else if (cardsInPlay.length === 2) {
  //   for (var j = cardsInPlay.length - 1; j >= 0; j--) {
  //     console.log(cardsInPlay[j].id);
  //     document.getElementById(cardsInPlay[j].id).firstChild.classList.remove('fadeOut');
  //     document.getElementById(cardsInPlay[j].id).firstChild.classList.add('fadeIn');
  //   }
  //   cardsInPlay = [];
  // }
}

function isMatch(cards) {
  return cards[0].animal === cards[1].animal;
}
function isSameCard(cards) {
  return cards[0].id === cards[1].id;
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
