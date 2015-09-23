describe("A pile", function () {
  "use strict";

  describe("without cards ", function () {

    var emptyPile;
    beforeEach(function() {
      emptyPile = new Pile();
    });

    it("should be empty", function () {
      expect(emptyPile.isEmpty()).toBe(true);
    });

    it("should return undefined as the top card", function () {
      expect(emptyPile.topCard()).toBeUndefined();
    });

    it(", removeCard should not error", function () {
      emptyPile.removeCard({});
    });
  });

  describe("with cards", function () {

    var cards;
    var pileWithCards;
    beforeEach(function() {
      cards = new Deck().unShuffled();
      pileWithCards = new Pile(cards);
    });

    it("should not be empty", function () {
      expect(pileWithCards.isEmpty()).toBe(false);
    });

    it("should return the last card as the top card", function () {
      var lastCard = cards[cards.length - 1];

      expect(pileWithCards.topCard()).toBe(lastCard);
    });

    it(", removeCard should not error if card not in pile", function () {
      pileWithCards.removeCard({});
    });

    it(", removeCard should remove card", function () {
      var bottomCard = pileWithCards.cards[0];

      pileWithCards.removeCard(bottomCard);

      expect(pileWithCards.cards).not.toContain(bottomCard);
    });

    it(", addTopCard should put card on top", function () {
      var newCard = {};

      pileWithCards.addTopCard(newCard);

      expect(pileWithCards.topCard()).toBe(newCard);
    });
  });
});
