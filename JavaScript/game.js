class Deck {
  constructor(cards) {
    this.deck = cards;
  }
}
//creating a deck of cards from the card array in the card.js file
let deckOne = new Deck(cards);

class Game {
  constructor(deck) {
    this.gameDeck = deck;
    this.gameOver = false;
    this.tableDeck = this.gameDeck;
    this.playerTotal = [];
    this.dealerTotal = [];
    this.playerFinal = 0;
    this.dealerFinal = 0;
  }

  //randomize card selection
  giveCard(cardLocation, target) {
    let randomCard = Math.floor(Math.random() * this.tableDeck.deck.length);
    cardLocation.style.backgroundImage = `url(${
      this.tableDeck.deck[randomCard].image
    })`;

    let cardValue = this.tableDeck.deck[randomCard].value;

    //updating the dealer total
    if (target === "dealer") {
      this.dealerTotal.push(cardValue);
      this.dealerFinal = this.dealerTotal.reduce((a, b) => {
        return a + b;
      });

      $("#dealer-total").text(`Dealer Total: ${this.dealerFinal}`);
    }

    //updating the player total
    if (target === "player") {
      this.playerTotal.push(cardValue);
      this.playerFinal = this.playerTotal.reduce((a, b) => {
        return a + b;
      });

      $("#player-total").text(`Player Total: ${this.playerFinal}`);
    }

    //remove used cards
    this.tableDeck.deck.splice(randomCard, 1);
  }

  //deals the cards to dealer
  dealCardToDealer() {
    let theCards = $(".dealerCard");
    for (let i = 0; i < theCards.length; i++) {
      if ($(".dealerCard")[i].style.backgroundImage === "") {
        this.giveCard($(".dealerCard")[i], "dealer");
      }
    }
  }

  //deals cards to player
  dealCardToPlayer() {
    let theCards = $(".playerCard");
    for (let i = 0; i < theCards.length; i++) {
      if ($(".playerCard")[i].style.backgroundImage === "") {
        this.giveCard($(".playerCard")[i], "player");
      }
    }
  }

  //calculate winner
  calcWinner() {
    if (this.playerFinal > 21) {
      gameOne.gameOver = true;
      alert("Player Busts, You Lose!");
      location.reload();
    } else if (this.dealerFinal > 21) {
      gameOne.gameOver = true;
      alert("Dealer Busts, You Win!");
      location.reload();
    }
    //else if (this.playerFinal > this.dealerFinal) {
    //   gameOne.gameOver = true;
    //   alert("Player Wins!");
    //   location.reload();
    // } else if (this.dealerFinal > this.playerFinal) {
    //   gameOne.gameOver = true;
    //   alert("Dealer Wins");
    //   location.reload();
    // }
  }
}

//creating a new game
let gameOne = new Game(deckOne);

//this loads as soon as the document is loaded
$(document).ready(function() {
  //   alert("Select a Bet Amount");

  //chip counter variables
  let totalChips = $("#chip-count").text();
  let totalSplit = totalChips.split("$");
  //total Values

  //once the user selects a bet price
  $(".chip-btn").click(function() {
    //reading user bet
    let chipValue = parseInt($(this).text()); //removing user bet amount from html
    totalSplit[1] = parseInt(totalSplit[1]) - chipValue; //subtracting user bet from total
    $("#chip-count").text(`${totalSplit[0]}$${totalSplit[1]}`); //updating chip amount
    //TODO: Make it so that you can only click a bet amount once per round
    $(".chip-btn").addClass(".chip-btn-blocked");
    if (totalSplit[1] < 0) {
      //making sure the user has money left
      gameOne.gameOver = true;
      alert("You Loose");
      location.reload();
    }

    //dealing to players
    setTimeout(() => {
      gameOne.dealCardToDealer();
      gameOne.dealCardToPlayer();
    }, 500);

    //calling the calc winner function to compare values
    setTimeout(() => {
      gameOne.calcWinner();
    }, 1000);

    $("#dealer-card-1").css(
      "background-image",
      "url(/PokerSet/PNGs/decks/small/deck_3.png)"
    );
  });

  //TODO: Hit Button
  //TODO: Stand Button
  //TODO: Double Down Button
  //TODO: Split Button
});
