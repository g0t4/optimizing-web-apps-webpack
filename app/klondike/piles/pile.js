function Pile(cards, scoring) {
  this.cards = cards || [];
  this.scoring = scoring;
}

Pile.prototype.isEmpty = function () {
  return this.cards.length === 0;
};
Pile.prototype.topCard = function () {
  return this.cards[this.cards.length - 1];
};
Pile.prototype.removeCard = function (card) {
  var index = this.cards.indexOf(card);
  this.cards.splice(index, 1);
};
Pile.prototype.addTopCard = function (card) {
  this.cards.push(card);
};
Pile.prototype.moveTopCardFrom = function (source) {
  var topOfSource = source.topCard();
  var accepted = this.drop(topOfSource);
  if (accepted) {
    this.scoring.dropped(source.constructor, this.constructor);
    source.removeCard(topOfSource);
  }
};
Pile.prototype.moveCardsFrom = Pile.prototype.moveTopCardFrom;
Pile.increasingRanks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];