// Section of Varaiables

// creating a NodeList holding all cards
var nl = document.querySelectorAll('.card');

// Turning that NodeList into an array
var cards = Array.prototype.slice.call(nl);

// deck of all cards
var deck = document.querySelector('.deck');

// variable of matched cards
var matchedCards = [];

// array for opened cards
var openedCards = [];

// Get the modal
var modal = document.querySelector('#myModal');

// close icon on modal
var closeIcon = document.querySelector('.close');

// declaring the move variables
var moves = 0;
var counter = document.querySelector('.moves');

// declaring variables for timer
var second = 0, minute = 0;
var timer = document.querySelector('.timer');
var interval;

// declaring the stars
const stars = document.querySelectorAll('.fa-star'); // Nodelist


// Section of functions

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*  1. Shuffling Cards when page is refreshed or initially loads
     --> so it does not start with the same deck at the beginnng*/
document.body.onload = startGame();

// 2. Function to start a new Game
function startGame(){
    
    // Creating a new deck
    cards = shuffle(cards);
    deck.innerHTML = "";
    Array.prototype.forEach.call(cards, function(cardElement){
        deck.appendChild(cardElement);
    })
    
    //openedCards = [];
    matchedCards = [];
    for (var i = 0; i < cards.length; i++){
        cards[i].classList.remove(/*  'show', 'open',*/ 'match', 'disabled');
    }

    // reset the moves
    moves = 0;
    counter.innerHTML = moves;

    // reset the timer
    second = 0;
    minute = 0;
    timer.innerHTML = minute + " mins " + second + " secs";
    clearInterval(interval);    // bricht die callback timer funktion innerhalb der setInterval funktion ab

    // resets the star rating
    for (var i = 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.opacity = "1";
        stars[i].style.visibility = "visible";
    }
}

// adding classes to display cards
var displayCard = function(){
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}

// Adding opened cards to OpenCards list and checking if cards match or not
function cardOpen(){
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2){
        moveCounter();

          
        var cardOne = openedCards[0].querySelector('i');
        var cardTwo = openedCards[1].querySelector('i');
        

        if(cardOne.className === cardTwo.className){
            matched();
        }
        else{
            unmatched();
        }
    }
}

// function when cards do match
function matched(){
    openedCards[0].classList.add('match', 'disabled');
    matchedCards.push(1);
    openedCards[1].classList.add('match', 'disabled');
    matchedCards.push(1);
    openedCards[0].classList.remove('show', 'open');
    openedCards[1].classList.remove('show', 'open');
    openedCards = [];
}

// function when cards do not match
function unmatched(){
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove('show', 'open', 'unmatched');
    openedCards[1].classList.remove('show', 'open', 'unmatched');
    enable();
    openedCards = [];
    }, 1100)   
}

// disable all cards temporarily
function disable(){
    for (var i = 0; i < cards.length; i++){
        cards[i].classList.add('disabled');
    }
}

// enable cards again, just leave matched cards disabled
function enable(){
    for (var i = 0; i < cards.length; i++){
        if(!(cards[i].classList.contains('match'))){
            cards[i].classList.remove('disabled');
        }
    }
}

// counting the player´s moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;

    // staring timer on first click
    if (moves == 1){
        startTimer();
    }
    // setting the star rating based on the moves
    if (moves > 8 && moves < 12){
        stars[2].style.cssText = "color: #2e3d49; opacity: 0.5;";
    }
    if (moves > 15){
        stars[2].style.cssText = "color: #2e3d49; opacity: 0.5;";
        stars[1].style.cssText = "color: #2e3d49; opacity: 0.5;";
    }
}

// setting the timer
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if (second == 60){
            minute++;
            second = 0;
        }
    }, 1000);
}

// showing congratulations modal, when all cards match
function congratulations(){
    console.log(matchedCards.length);
    if (matchedCards.length == 16){
        clearInterval(interval);
        var finalTime = timer.innerHTML;

        

        // declare star rating variable
        var starRating = document.querySelector('.stars').innerHTML; // getting the innerHtml of the unordered list
        
        // showing moves, rating and time on modal
        document.querySelector('#finalMove').innerHTML = moves;
        document.querySelector('#starRating').innerHTML = starRating;
        document.querySelector('#totalTime').innerHTML = finalTime;
        
        // show modal
        modal.classList.add('show');
        
        // close modal
        closeModal()
    }
}

// closing the modal on icon
function closeModal(){
    closeIcon.addEventListener('click', function(e){
        modal.classList.remove('show');
        startGame();
    })
}

// Play Again Function on Modal
function playAgain(){
    modal.classList.remove('show');
    startGame();
}

// Adding Event Listeners to each Card 
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click',  displayCard);
    card.addEventListener('click',  cardOpen); 
    card.addEventListener('click',  congratulations);
}