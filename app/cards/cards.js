function Card(card) {
  this.suit = card.suit;
  this.rank = card.rank;
  this.image = (Card.ranksInImagesOrder.indexOf(this.rank) * 4 + Card.suitsInImagesOrder.indexOf(this.suit) + 1) + ".png";
  this.color = card.suit === "Spades" || card.suit === "Clubs" ? "black" : "red";
  this.turnedUp = false;
}

Card.ranksInImagesOrder = ["Ace", "King", "Queen", "Jack", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
Card.suitsInImagesOrder = ["Clubs", "Spades", "Hearts", "Diamonds"];

Card.prototype.turnUp = function () {
  this.turnedUp = true;
};
Card.prototype.turnDown = function () {
  this.turnedUp = false;
};

function Deck() {
  this.unShuffled = function unShuffled() {
    return _.chain(Card.ranksInImagesOrder)
      .map(function (rank) {
        return Card.suitsInImagesOrder.map(function (suit) {
          return {
            suit: suit,
            rank: rank
          };
        });
      })
      .flatten()
      .map(function (card) {
        return new Card(card);
      })
      .value();
  };

  this.shuffled = function shuffled() {
    return _.shuffle(this.unShuffled());
  };
}