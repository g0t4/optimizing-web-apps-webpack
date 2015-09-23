describe("A game of klondike", function () {
  "use strict";

  beforeEach(module("klondike"));

  it("should deal seven tableau piles of increasing piles.", inject(function (klondikeGame) {
    klondikeGame.newGame();

    expect(klondikeGame.tableaus.length).toBe(7);
    expect(klondikeGame.tableaus[0].cards.length).toBe(1);
    expect(klondikeGame.tableaus[1].cards.length).toBe(2);
    expect(klondikeGame.tableaus[2].cards.length).toBe(3);
    expect(klondikeGame.tableaus[3].cards.length).toBe(4);
    expect(klondikeGame.tableaus[4].cards.length).toBe(5);
    expect(klondikeGame.tableaus[5].cards.length).toBe(6);
    expect(klondikeGame.tableaus[6].cards.length).toBe(7);
  }));

  function anyTurnedUp(Klondike) {
    return Klondike.remainder.cards.filter(function (card) {
        return card.turnedUp === true;
      }).length > 0;
  }

  it("should deal remainder to deck turned down.", inject(function (klondikeGame) {
    klondikeGame.newGame();

    expect(klondikeGame.remainder.cards.length).toBe(24);
    expect(anyTurnedUp(klondikeGame)).toBe(false);
  }));

  it("should not deal any duplicate cards.", inject(function (klondikeGame) {
    klondikeGame.newGame();

    var uniqueDealtCards = _.chain(klondikeGame.tableaus)
      .map("cards")
      .flatten()
      .union(klondikeGame.remainder.cards)
      .uniq()
      .value();
    expect(uniqueDealtCards.length).toBe(52);
  }));

  it("should deal tableau piles with last card turned up.", inject(function (klondikeGame) {
    klondikeGame.newGame();

    var tableaus = klondikeGame.tableaus;
    var uniqueTableauCards = _.chain(tableaus).map("cards").flatten().uniq().value();
    var shouldBeTurnedUp = tableaus.map(function (tableau) {
      return tableau.topCard();
    });

    var actuallyTurnedUp = _.filter(uniqueTableauCards, "turnedUp");

    expect(actuallyTurnedUp).toEqual(shouldBeTurnedUp);
  }));

  describe("with an unshuffled deck", function () {

    var klondikeGame;
    beforeEach(inject(function (_klondikeGame_) {
      // note: board dealt with cards in order has the following in tableaus:
      // ace spades, ace hearts, king spades, queen spades, jack hearts, 9 clubs, 8 diamonds
      // first remainder card is 2 diamonds
      var unShuffled = new Deck().unShuffled();
      _klondikeGame_.newGameFromDeck(unShuffled);
      klondikeGame = _klondikeGame_;
    }));

    it("should allow moving first tableau's ace to first foundation", function () {
      var firstTableau = klondikeGame.tableaus[0];
      var firstFoundation = klondikeGame.foundations[0];
      var ace = firstTableau.topCard();
      expect(ace.rank).toBe("Ace");
      firstFoundation.moveCardsFrom(firstTableau);

      expect(firstFoundation.cards).toContain(ace);
      expect(firstTableau.isEmpty()).toBe(true);
    });

    it("should allow moving second tableau's ace to first foundation and turns over next card in second tableau", function () {
      var secondTableau = klondikeGame.tableaus[1];
      var firstFoundation = klondikeGame.foundations[0];
      var ace = secondTableau.topCard();
      expect(ace.rank).toBe("Ace");
      firstFoundation.moveCardsFrom(secondTableau);

      expect(secondTableau.cards.length).toBe(1);
      expect(secondTableau.topCard().turnedUp).toBe(true);
    });

    it("should not allow moving third tableau's king of spades to first foundation", function () {
      var thirdTableau = klondikeGame.tableaus[2];
      var firstFoundation = klondikeGame.foundations[0];
      var king = thirdTableau.topCard();
      expect(king.rank).toBe("King");
      firstFoundation.moveCardsFrom(thirdTableau);

      expect(firstFoundation.isEmpty()).toBe(true);
      expect(thirdTableau.topCard()).toBe(king);
    });

    it("should not allow moving remainder's two of diamonds to first tableau's ace of clubs", function () {
      var firstTableau = klondikeGame.tableaus[0];
      klondikeGame.remainder.flipTopCardToWaste();
      var waste = klondikeGame.remainder.waste;
      var two = waste.topCard();
      expect(two.rank).toBe("2");
      firstTableau.moveCardsFrom(waste);

      expect(firstTableau.topCard().rank).toBe("Ace");
      expect(waste.topCard()).toBe(two);
    });

    it(", if we reverse remainder (hack the scenario) so 7 of clubs is on top, should allow moving foundation's 7 of clubs to last tableau's 8 of diamonds", function () {
      var lastTableau = klondikeGame.tableaus[6];
      klondikeGame.remainder.cards.reverse();
      klondikeGame.remainder.flipTopCardToWaste();
      var waste = klondikeGame.remainder.waste;
      var sevenOfClubs = waste.topCard();
      expect(sevenOfClubs.rank).toBe("7");
      expect(sevenOfClubs.suit).toBe("Clubs");
      lastTableau.moveCardsFrom(waste);

      expect(lastTableau.topCard()).toBe(sevenOfClubs);
      expect(waste.isEmpty()).toBe(true);
    });

    it("should allow moving remainder to foundation", function () {
      var secondTableau = klondikeGame.tableaus[1];
      var firstFoundation = klondikeGame.foundations[0];
      var aceOfHearts = secondTableau.topCard();
      expect(aceOfHearts.rank).toBe("Ace");
      expect(aceOfHearts.suit).toBe("Hearts");
      firstFoundation.moveCardsFrom(secondTableau);
      var remainder = klondikeGame.remainder;
      remainder.flipTopCardToWaste();
      remainder.flipTopCardToWaste();
      var twoOfHearts = remainder.waste.topCard();
      expect(twoOfHearts.rank).toBe("2");
      expect(twoOfHearts.suit).toBe("Hearts");

      firstFoundation.moveCardsFrom(remainder.waste);

      expect(remainder.waste.topCard()).not.toBe(twoOfHearts);
      expect(firstFoundation.topCard()).toBe(twoOfHearts);
    });

    it("should not allow moving remainder to foundation if not next rank in suit", function () {
      var firstFoundation = klondikeGame.foundations[0];
      var remainder = klondikeGame.remainder;
      remainder.flipTopCardToWaste();
      var two = remainder.waste.topCard();
      expect(two.rank).toBe("2");

      firstFoundation.moveCardsFrom(remainder.waste);

      expect(firstFoundation.isEmpty()).toBe(true);
      expect(remainder.waste.topCard()).toBe(two);
    });

    it(", tryMoveTopCardToAnyFoundation should moveCardsFrom first tableau's ace to first foundation", function () {
      var firstTableau = klondikeGame.tableaus[0];
      var firstFoundation = klondikeGame.foundations[0];
      var ace = firstTableau.topCard();
      expect(ace.rank).toBe("Ace");
      klondikeGame.tryMoveTopCardToAnyFoundation(firstTableau);

      expect(firstFoundation.cards).toContain(ace);
      expect(firstTableau.isEmpty()).toBe(true);
    });

    it(", tryMoveTopCardToAnyFoundation should not error on empty pile", function () {
      var firstTableau = klondikeGame.tableaus[0];
      var ace = firstTableau.topCard();
      expect(ace.rank).toBe("Ace");
      klondikeGame.tryMoveTopCardToAnyFoundation(firstTableau);
      klondikeGame.tryMoveTopCardToAnyFoundation(firstTableau);
    });

  });
});
