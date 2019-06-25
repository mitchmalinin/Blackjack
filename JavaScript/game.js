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
    this.canBet = true;
    this.userHitStand = false;
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
    console.log(this.tableDeck.deck.length);
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

  //resetting values
  resetPlayerAndDealerTotals() {
    this.playerTotal = [];
    this.playerFinal = 0;
    this.dealerTotal = [];
    this.dealerFinal = 0;
    $(".card").css("background-image", "");
    $("#player-total").text(`Player Total: ${this.playerFinal}`);
    $("#dealer-total").text(`Dealer Total: ${this.dealerFinal}`);
  }

  //calculate winner
  calcWinner() {
    if (this.playerFinal > 21) {
      //this.gameOver = true;
      alert("Player Busts, You Lose!");
      this.resetPlayerAndDealerTotals();
      if ($(".playerCard").length > 2) {
        $(".added").remove();
      }
    } else if (this.dealerFinal > 21) {
      //   this.gameOne.gameOver = true;
      alert("Dealer Busts, You Win!");
      this.resetPlayerAndDealerTotals();
      if ($(".dealerCard").length > 2) {
        $(".added").remove();
      }
    } else if (this.playerFinal == 21) {
      alert("BLACK JACK");
      this.resetPlayerAndDealerTotals();
      if ($(".playerCard").length > 2) {
        $(".added").remove();
      }
    } else if (this.dealerFinal == 21) {
      alert("Dealer Hits Blackjack, you lose!");
      this.resetPlayerAndDealerTotals();
      if ($(".dealerCard").length > 2) {
        $(".added").remove();
      }
    }

    //TODO: when the dealer cant bet after 17 or hits on 16 and its under 21 run this code
    else if (this.playerFinal > this.dealerFinal && this.userHitStand == true) {
      this.userHitStand = false;
      console.log(this.userHitStand);
      alert("Player Wins!");
      this.resetPlayerAndDealerTotals();
      $(".added").remove();
    } else if (
      this.dealerFinal > this.playerFinal &&
      this.userHitStand == true
    ) {
      gameOne.gameOver = true;
      alert("Dealer Wins");
      this.resetPlayerAndDealerTotals();
      $(".added").remove();
    }
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
    if (gameOne.canBet) {
      //Make it so that you can only click a bet amount once per round
      gameOne.canBet = false;
      let chipValue = parseInt($(this).text()); //removing user bet amount from html
      totalSplit[1] = parseInt(totalSplit[1]) - chipValue; //subtracting user bet from total
      $("#chip-count").text(`${totalSplit[0]}$${totalSplit[1]}`); //updating chip amount
      //making sure the user has money left
      if (totalSplit[1] < 0) {
        gameOne.gameOver = true;
        alert("You Loose");
        location.reload();
      }
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

    //setting back card image to dealer position one
    $("#dealer-card-1").css(
      "background-image",
      "url(/PokerSet/PNGs/decks/small/deck_3.png)"
    );
  });

  //Hit Button
  $("#hit").click(function() {
    //Add a special class to delete
    let newCard = '<div class="playerCard card added"></div>';
    $(".player-hand").append(newCard);
    setTimeout(() => {
      gameOne.dealCardToPlayer();
    }, 300);
    setTimeout(() => {
      gameOne.calcWinner();
    }, 400);
  });

  //Stand Button
  $("#stay").click(function() {
    $("#dealer-card-1").css("background-image", "");
    //FIXME: when the user loses the first time using the userhitstand, the next round it will say who is the winner after dealing the cards wihouth taking user input
    gameOne.userHitStand = true;
    gameOne.dealCardToDealer();
    runDealerCard();
  });

  function runDealerCard() {
    setTimeout(() => {
      //FIXME: why doesnt this work with while
      if (gameOne.dealerFinal <= 16) {
        let newCard = '<div class="dealerCard card added"></div>';
        $(".house-hand").append(newCard);
        setTimeout(() => {
          gameOne.dealCardToDealer();
        }, 300);
        setTimeout(() => {
          gameOne.calcWinner();
        }, 400);
      }
    }, 300);
  }
  //TODO: Double Down Button
  //TODO: Split Button
});
