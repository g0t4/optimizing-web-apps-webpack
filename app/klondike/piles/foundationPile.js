
function FoundationPile(cards, scoring) {
  Pile.call(this, cards, scoring);
}

FoundationPile.prototype = Object.create(Pile.prototype);
FoundationPile.prototype.constructor = FoundationPile;
FoundationPile.prototype.willAcceptCard = function (card) {
  if (this.isEmpty()) {
    return card.rank === "Ace";
  }

  var topCard = this.topCard();
  var nextRank = Pile.increasingRanks[Pile.increasingRanks.indexOf(topCard.rank) + 1];
  return topCard.suit === card.suit
    && card.rank === nextRank;
};
FoundationPile.prototype.drop = function (card) {
  if (this.willAcceptCard(card)) {
    this.addTopCard(card);
    return true;
  }
  return false;
};
