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
    this.totalChips = $("#chip-count").text();
    this.totalSplit = this.totalChips.split("$");
    this.currentBet = $("#current-bet").text();
    this.chipValue = 0;
    this.doneBet = false;
    this.chipTotalAmount = [];
    this.finalBetAmount = 0;
    this.usedAllChips = false;
    this.hasAce = false;
    this.cardValue = 0;
  }

  updatePlayerTotal() {
    this.playerFinal = this.playerTotal.reduce((a, b) => {
      return a + b;
    });
  }

  updateDealerTotal() {
    this.dealerFinal = this.dealerTotal.reduce((a, b) => {
      return a + b;
    });
  }

  //randomize card selection
  giveCard(cardLocation, target) {
    if (this.tableDeck.deck.length > 0) {
      let randomCard = Math.floor(Math.random() * this.tableDeck.deck.length);
      cardLocation.style.backgroundImage = `url(${
        this.tableDeck.deck[randomCard].image
      })`;

      this.cardValue = this.tableDeck.deck[randomCard].value;

      this.isThereAnAce(target);
      //remove used cards
      this.tableDeck.deck.splice(randomCard, 1);
      console.log(this.tableDeck.deck.length);
    } else {
      //FIXME: this needs to recret a new deck
      this.tableDeck.deck = this.gameDeck.deck;
      console.log("end of deck");
    }
  }

  isThereAnAce(target) {
    this.hasAce = false;
    if (target === "player") {
      this.playerTotal.push(this.cardValue);
      this.updatePlayerTotal();
      for (let j = 0; j < this.playerTotal.length; j++) {
        console.log(this.playerTotal);
        if (this.playerTotal[j] == 11 && this.playerFinal > 21) {
          this.hasAce = true;
          this.playerTotal[j] = 1;
          this.updatePlayerTotal();
        }
      }
      $("#player-total").text(`Player Total: ${this.playerFinal}`);
    }
    if (target === "dealer") {
      this.dealerTotal.push(this.cardValue);
      this.updateDealerTotal();
      //TODO: do the ace
      for (let j = 0; j < this.dealerTotal.length; j++) {
        if (this.dealerTotal[j] == 11 && this.dealerFinal > 21) {
          this.hasAce = true;
          this.dealerTotal[j] = 1;
          this.updateDealerTotal();
        }
      }
      $("#dealer-total").text(`Dealer Total: ${this.dealerFinal}`);
    }

    return this.hasAce;
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
        //TODO: do the ace
      }
    }
  }

  //resetting values
  resetPlayerAndDealerTotals() {
    this.playerTotal = [];
    this.playerFinal = 0;
    this.dealerTotal = [];
    this.dealerFinal = 0;
    this.userHitStand = false;
    $(".card").css("background-image", "");
    $("#player-total").text(`Player Total: ${this.playerFinal}`);
    $("#dealer-total").text(`Dealer Total: ${this.dealerFinal}`);
  }

  //calculate winner
  calcWinner() {
    if (!this.hasAce) {
      if (this.playerFinal > 21) {
        //this.gameOver = true;
        alert("Player Busts, You Lose!");
        this.resetPlayerAndDealerTotals();
        this.chipTotalAmount = [];
        this.canBet = true;
        if ($(".playerCard").length > 2) {
          $(".added").remove();
        }
      } else if (this.dealerFinal > 21) {
        //   this.gameOne.gameOver = true;
        alert("Dealer Busts, You Win!");
        this.resetPlayerAndDealerTotals();
        this.canBet = true;
        if ($(".dealerCard").length > 2) {
          $(".added").remove();
        }
        //adding the bett
        this.finalBetAmount = this.calcBetAmount();
        this.totalSplit[1] =
          parseInt(this.totalSplit[1]) + this.finalBetAmount * 2; //subtracting user bet from total
        $("#chip-count").text(`${this.totalSplit[0]}$${this.totalSplit[1]}`);
        this.chipTotalAmount = [];
        //end of betting
      } else if (this.playerFinal == 21) {
        $("#dealer-card-1").css("background-image", "");
        this.dealCardToDealer();
        setTimeout(() => {
          if (this.playerFinal == 21 && this.dealerFinal != 21) {
            alert("BLACK JACK, YOU WIN");
            this.finalBetAmount = this.calcBetAmount();
            this.totalSplit[1] =
              parseInt(this.totalSplit[1]) + this.finalBetAmount * 2;
            $("#chip-count").text(
              `${this.totalSplit[0]}$${this.totalSplit[1]}`
            );
            this.chipTotalAmount = [];
            this.resetPlayerAndDealerTotals();
            this.canBet = true;
            if ($(".playerCard").length > 2) {
              $(".added").remove();
            }
          }
          if (this.playerFinal == 21 && this.dealerFinal == 21) {
            alert("Dealer Hits Blackjack, you lose!");
            this.resetPlayerAndDealerTotals();
            this.chipTotalAmount = [];
            this.canBet = true;
            if ($(".dealerCard").length > 2) {
              $(".added").remove();
            }
          }
        }, 300);
      } else if (this.dealerFinal == 21) {
        alert("Dealer Hits Blackjack, you lose!");
        this.resetPlayerAndDealerTotals();
        this.chipTotalAmount = [];
        this.canBet = true;
        if ($(".dealerCard").length > 2) {
          $(".added").remove();
        }
      } else if (
        this.playerFinal > this.dealerFinal &&
        this.userHitStand == true
      ) {
        this.userHitStand = false;
        console.log("The player is more than the dealer");
        alert("Player Wins!");

        this.finalBetAmount = this.calcBetAmount();
        this.totalSplit[1] =
          parseInt(this.totalSplit[1]) + this.finalBetAmount * 2;
        $("#chip-count").text(`${this.totalSplit[0]}$${this.totalSplit[1]}`);
        this.chipTotalAmount = [];

        this.resetPlayerAndDealerTotals();
        this.canBet = true;
        $(".added").remove();
      } else if (
        this.dealerFinal > this.playerFinal &&
        this.userHitStand == true
      ) {
        console.log("The dealer is more than the player");
        this.userHitStand = false;
        alert("Dealer Wins");
        this.resetPlayerAndDealerTotals();
        this.chipTotalAmount = [];
        this.canBet = true;
        $(".added").remove();
      } else if (
        this.dealerFinal == this.playerFinal &&
        this.userHitStand == true
      ) {
        console.log("yall the same");
        this.userHitStand = false;
        alert("You Pushed");

        this.finalBetAmount = this.calcBetAmount();
        this.totalSplit[1] = parseInt(this.totalSplit[1]) + this.finalBetAmount; //subtracting user bet from total
        $("#chip-count").text(`${this.totalSplit[0]}$${this.totalSplit[1]}`);
        this.chipTotalAmount = [];

        this.resetPlayerAndDealerTotals();
        this.canBet = true;
        $(".added").remove();
      }
    }
  }
  //use this to for calculating total bets
  calcBetAmount() {
    let total = this.chipTotalAmount.reduce((a, b) => {
      return a + b;
    });
    return total;
  }
}

//creating a new game
let gameOne = new Game(deckOne);
let total = 0;
//this loads as soon as the document is loaded
$(document).ready(function() {
  //once the user selects a bet price
  $(".chip-btn").click(function() {
    //reading user bet
    if (gameOne.canBet) {
      //Make it so that you can only click a bet amount once per round
      gameOne.chipValue = parseInt($(this).text()); //removing user bet amount from html
      gameOne.chipTotalAmount.push(gameOne.chipValue);
      console.log(gameOne.chipTotalAmount);
      gameOne.totalSplit[1] =
        parseInt(gameOne.totalSplit[1]) - gameOne.chipValue; //subtracting user bet from total
      $("#chip-count").text(
        `${gameOne.totalSplit[0]}$${gameOne.totalSplit[1]}`
      );
      //update the current bet amount
      if (gameOne.usedAllChips == false) {
        total = total + gameOne.chipValue;
        $("#current-bet").text(`Current Bet: $${total}`);
      }
      if (gameOne.usedAllChips == true) {
        gameOne.calcWinner();
        gameOne.usedAllChips = false;
        total = total + gameOne.chipValue;
        $("#current-bet").text(`Current Bet: $${total}`);
      }
      //making sure the user has money left
      if (
        gameOne.totalSplit[1] < 0 &&
        gameOne.chipTotalAmount.length > 0 &&
        gameOne.calcBetAmount() != 0
      ) {
        alert("You bet the max");
        gameOne.usedAllChips = true;
        gameOne.chipTotalAmount.pop();
        gameOne.chipTotalAmount.push(gameOne.totalSplit[1] + gameOne.chipValue);
        console.log(gameOne.chipTotalAmount);
        $("#current-bet").text(`Current Bet: $${gameOne.calcBetAmount()}`);
        gameOne.totalSplit[1] = 0;
        $("#chip-count").text(
          `${gameOne.totalSplit[0]}$${gameOne.totalSplit[1]}`
        );

        gameOne.canBet = true;
      }
      if (gameOne.calcBetAmount() == 0) {
        alert("YOU LOST ALL YOUR MONEY, REFRESHING TO PAGE");
        location.reload();
      }
    }
  });

  //making it so that you can use this button to finish betting
  $(".bet").click(function() {
    //this test to see if the user used all the money and has money left
    if (
      (gameOne.usedAllChips == false &&
        gameOne.chipTotalAmount.length > 0 &&
        gameOne.calcBetAmount() != 0) ||
      (gameOne.usedAllChips == true &&
        gameOne.chipTotalAmount.length > 0 &&
        gameOne.calcBetAmount() != 0)
    ) {
      gameOne.doneBet = false;
      gameOne.canBet = false;
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
        "url(./PokerSet/PNGs/decks/small/deck_3.png)"
      );
    } else {
      gameOne.canBet == true;
    }
    total = 0;
    $("#current-bet").text(`Current Bet: $0`);
  });

  //ALL in Button
  $(".all-in").click(function() {
    if (gameOne.totalSplit[1] > 0) {
      gameOne.chipTotalAmount.push(gameOne.totalSplit[1]);
      $("#current-bet").text(`Current Bet: $${gameOne.calcBetAmount()}`);
      gameOne.totalSplit[1] =
        parseInt(gameOne.totalSplit[1]) - gameOne.totalSplit[1];
      $("#chip-count").text(
        `${gameOne.totalSplit[0]}$${gameOne.totalSplit[1]}`
      );
      gameOne.usedAllChips = true;
      gameOne.canBet = false;
    }
    console.log(gameOne.chipTotalAmount);
  });

  //Hit Button
  console.log(gameOne.canBet);
  $("#hit").click(function() {
    //FIXME: I cant click this button fast
    if (gameOne.canBet == false && gameOne.chipTotalAmount.length > 0) {
      let newCard = '<div class="playerCard card added"></div>';
      $(".player-hand").append(newCard);
      setTimeout(() => {
        gameOne.dealCardToPlayer();
      }, 300);
      setTimeout(() => {
        gameOne.calcWinner();
      }, 350);
    }
    //Add a special class to delete
  });

  //Stand Button
  $("#stay").click(function() {
    if (
      gameOne.userHitStand == false &&
      gameOne.canBet == false &&
      gameOne.chipTotalAmount.length > 0
    ) {
      $("#dealer-card-1").css("background-image", "");
      //FIXME: make sure the user can only click thus button once a round
      gameOne.userHitStand = true;
      console.log(gameOne.userHitStand);
      gameOne.dealCardToDealer();

      runDealerCard();
    }
  });

  function runDealerCard() {
    setTimeout(() => {
      if (gameOne.dealerFinal <= 16) {
        let newCard = '<div class="dealerCard card added"></div>';
        $(".house-hand").append(newCard);
        setTimeout(() => {
          gameOne.dealCardToDealer();
        }, 300);
        setTimeout(() => {
          //calls this if the dealer total is still under 16
          runDealerCard();
        }, 500);
      } else {
        setTimeout(() => {
          gameOne.calcWinner();
        }, 400);
      }
    }, 300);
  }
  //TODO: Double Down Button
  //TODO: Split Button
});
