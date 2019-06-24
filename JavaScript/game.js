class Deck {
  constructor(cards) {
    this.deck = cards;
  }

  //TODO: Shuffle Deck
}
//creating a deck of cards from the card array in the card.js file
let deckOne = new Deck(cards);

class Game {
  constructor(deck) {
    this.gameDeck = deck;
    this.gameOver = false;
  }

  //TODO: randomize card selection

  //TODO: deal cards
  //TODO: remove used cards
  //TODO: deal cards
}

//creating a new game
let gameOne = new Game(deckOne);
//this loads as soon as the document is loaded
$(document).ready(function() {
  //FIXME: This is how I would change the background image of the div
  //   $(".card").css(
  //     "background-image",
  //     "url(" + gameOne.gameDeck.deck[0].image + ")"
  //   );

  //   alert("Select a Bet Amount");

  //chip counter variables
  let totalChips = $("#chip-count").text();
  let totalSplit = totalChips.split("$");

  //once the user selects a bet price
  $(".chip-btn").click(function() {
    //reading user bet
    let chipValue = parseInt($(this).text()); //removing user bet amount from html
    totalSplit[1] = parseInt(totalSplit[1]) - chipValue; //subtracting user bet from total
    $("#chip-count").text(`${totalSplit[0]}$${totalSplit[1]}`); //updating chip amount
    if (totalSplit[1] < 0) {
      //making sure the user has money left
      gameOne.gameOver = true;
      alert("You Loose");
      location.reload();
    }
  });
});
