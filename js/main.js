// Model
var game = {
  deck: {
    fronts: [
      'chameleon',
      'eagle',
      'flamingo',
      'giraffe',
      'penguin',
      'snail'
    ],
    back: 'img/card-back.png',
    create: function() {
      var cards = [];
      this.front.forEach(function(front, index) {
        console.log(this);
      })
      return shuffle(cards);
    },
    shuffle: function(array) {
      var currentIndex = array.length,
        temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  },
  duration: null
};

// Controller
var controller = {
  init: function() {
    board.init();
    timer.init();

    this.newGame();
  },
  createDeck: function() {
    var deck = []
  },
  shuffleDeck: function(array) { // Shuffle function courtesy of Stack Overflow
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
};
// Views
var board = {
  init: function() {

  }
};

var timer = {
  init: function() {

  }
};

var modal = {
  init: function() {

  }
}


var cards = ['chameleon', 'chameleon', 'eagle', 'eagle', 'flamingo', 'flamingo', 'giraffe', 'giraffe', 'penguin', 'penguin', 'snail', 'snail'],
    cardsInPlay = [],
    cardsRemaining = 12,
    startTime,
    timerRequest,
    formattedElapsedTime;

var board = document.getElementById('game-board'),
    timer = document.getElementById('timer');


document.getElementById('reset-btn').addEventListener('click', resetGame);
document.getElementById('modal-reset-btn').addEventListener('click', resetGame);

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
    front.setAttribute('style', `background-image: url(img/${card}.png)`);
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
      stopTimer();
      displayModal();
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
  formattedElapsedTime = `${minutes}:${seconds}.${milliseconds}`
  timer.textContent = formattedElapsedTime;
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
  document.getElementById('modal-win-time').textContent = formattedElapsedTime;
  var winMessage = `I just cleared Animal Match in ${formattedElapsedTime}! #AnimalMatch`;
  document.getElementById('modal-tweet-btn').setAttribute('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(winMessage)}`);

  //actually display modal
  $('#win-modal').modal();
}

function stopTimer() {
  window.cancelAnimationFrame(timerRequest);
}

function resetTimer() {
  stopTimer()
  startTime = null;
  timer.textContent = "00:00.000";
}

//from Stack Overflow
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
game.deck.create();
