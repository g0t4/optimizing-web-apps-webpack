
function TableauPile(cards, scoring) {
  Pile.call(this, cards, scoring);
}

TableauPile.prototype = Object.create(Pile.prototype);
TableauPile.prototype.constructor = TableauPile;
TableauPile.prototype.turnTopCardUp = function () {
  this.topCard().turnUp();
};
TableauPile.prototype.willAcceptCard = function (card) {
  if (this.isEmpty()) {
    return card.rank === "King";
  }

  var topCard = this.topCard();
  var nextLowerRank = Pile.increasingRanks[Pile.increasingRanks.indexOf(topCard.rank) - 1];
  return card.rank === nextLowerRank &&
    card.color !== topCard.color;
};
TableauPile.prototype.drop = function (card) {
  if (this.willAcceptCard(card)) {
    this.addTopCard(card);
    return true;
  }
  return false;
};
TableauPile.prototype.removeCard = function (card) {
  Pile.prototype.removeCard.call(this, card);
  var topCard = this.topCard();
  if (!topCard) {
    return;
  }
  if (!topCard.turnedUp) {
    this.scoring.tableauCardTurnedUp();
  }
  topCard.turnUp();
};
TableauPile.prototype.moveFromTableau = function (source) {
  var destination = this;
  var acceptIndex = _.findIndex(source.cards, function (card) {
    return card.turnedUp && destination.willAcceptCard(card);
  });
  if (acceptIndex < 0) {
    return;
  }
  var rest = _.rest(source.cards, acceptIndex);
  rest.forEach(function (card) {
    source.removeCard(card);
    destination.addTopCard(card);
  });
};
TableauPile.prototype.moveCardsFrom = function (source) {
  if(source == null) {
    return;
  }
  if (source instanceof TableauPile) {
    this.moveFromTableau(source);
    return;
  }
  this.moveTopCardFrom(source);
};
TableauPile.prototype.heightForDrop = function () {
  return (96 + Math.max(0, this.cards.length - 1) * 16) + 'px';
};