function WastePile(cards, scoring) {
  Pile.call(this, cards, scoring);
}

WastePile.prototype = Object.create(Pile.prototype);
WastePile.prototype.constructor = WastePile;

function RemainderPile(cards, scoring) {
  Pile.call(this, cards, scoring);
  this.waste = new WastePile([], scoring);
}

RemainderPile.prototype = Object.create(Pile.prototype);
RemainderPile.prototype.constructor = RemainderPile;
RemainderPile.prototype.flipTopCardToWaste = function () {
  var card = this.topCard();
  if (card === undefined) {
    recycleWaste.call(this);
    this.scoring.wasteRecycled();
    return;
  }
  flipToWaste.call(this, card);
};
function flipToWaste(card) {
  this.removeCard(card);
  this.waste.addTopCard(card);
  card.turnUp();
}

function recycleWaste() {
  this.cards = this.waste.cards.reverse();
  this.waste = new WastePile([], this.scoring);
  this.cards.forEach(function (card) {
    card.turnDown();
  });
}