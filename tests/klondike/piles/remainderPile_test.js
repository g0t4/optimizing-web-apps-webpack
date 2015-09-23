describe("A remainder pile", function () {
  "use strict";

  beforeEach(module("klondike.scoring"));

  it("should accept cards into the remainder", function() {
    var cards = new Deck().unShuffled();
    var remainder = new RemainderPile(cards);

    expect(remainder.cards).toBe(cards);
  });

  it("should flip the top card onto the waste", function() {
    var cards = new Deck().unShuffled();
    var remainder = new RemainderPile(cards);
    var topCard = remainder.topCard();

    remainder.flipTopCardToWaste();

    expect(remainder.cards).not.toContain(topCard);
    expect(remainder.waste.cards).toContain(topCard);
    expect(topCard.turnedUp).toBe(true);
  });

  describe("with nothing left in the remainder and two cards in waste, then flipTopCardToWaste will", function () {

    var firstCard;
    var secondCard;
    var remainder;
    beforeEach(inject(function(scoring) {
      firstCard = new Card({rank: "Ace", suit: "Clubs"});
      secondCard = new Card({rank: "Ace", suit: "Spades"});
      remainder = new RemainderPile([firstCard, secondCard], scoring);
      remainder.flipTopCardToWaste();
      remainder.flipTopCardToWaste();
      expect(remainder.isEmpty()).toBe(true);

      remainder.flipTopCardToWaste();
    }));

    describe("flipTopCardToWaste ", function () {

      it("construct an empty waste pile", function(){
        expect(remainder.waste.constructor.name).toBe("WastePile");
        expect(remainder.waste.scoring).toBe(remainder.scoring);
      });

      it("recycle waste cards back into remainder", function () {
        expect(remainder.waste.isEmpty()).toBe(true);
        expect(remainder.cards).toContain(firstCard);
        expect(remainder.cards).toContain(secondCard);
      });

      it("turn cards down in remainder pile", function () {
        expect(firstCard.turnedUp).toBe(false);
        expect(secondCard.turnedUp).toBe(false);
      });

      it("reverse cards into remainder", function () {
        expect(remainder.cards).toEqual([firstCard, secondCard]);
      });
    });
  });
});
