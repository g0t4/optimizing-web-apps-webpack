describe("The score", function () {
  "use strict";

  beforeEach(module("klondike"));

  it("should start at zero", inject(function (scoring, klondikeGame) {
    klondikeGame.newGame();

    expect(scoring.score).toBe(0);
  }));

  it("should reset score on a new game", inject(function (scoring, klondikeGame) {
    klondikeGame.newGame();
    scoring.score = 10;

    klondikeGame.newGame();

    expect(scoring.score).toBe(0);
  }));

  it("should add 5 when waste moved to tableau", inject(function (scoring) {
    var king = new Card({rank: "King", suit: "Spades"});
    var remainderWithKingOnWaste = new RemainderPile([king], scoring);
    remainderWithKingOnWaste.flipTopCardToWaste();
    var tableau = new TableauPile([], scoring);

    tableau.moveCardsFrom(remainderWithKingOnWaste.waste);

    expect(scoring.score).toBe(5);
  }));

  it("should add 10 when waste moved to foundation", inject(function (scoring) {
    var ace = new Card({rank: "Ace", suit: "Spades"});
    var remainderWithAceOnWaste = new RemainderPile([ace], scoring);
    remainderWithAceOnWaste.flipTopCardToWaste();
    var foundation = new FoundationPile([], scoring);

    foundation.moveCardsFrom(remainderWithAceOnWaste.waste);

    expect(scoring.score).toBe(10);
  }));

  it("should add 10 when tableau moved to foundation", inject(function (scoring) {
    var ace = new Card({rank: "Ace", suit: "Spades"});
    var tableauWithAce = new TableauPile([ace], scoring);
    var foundation = new FoundationPile([], scoring);

    foundation.moveCardsFrom(tableauWithAce);

    expect(scoring.score).toBe(10);
  }));

  it("should subtract 15 when foundation moved to tableau", inject(function (scoring) {
    var blackTwo = new Card({rank: "2", suit: "Spades"});
    var tableauWithBlackTwo = new TableauPile([blackTwo], scoring);
    var redAce = new Card({rank: "Ace", suit: "Hearts"});
    var foundationWithRedAce = new FoundationPile([redAce], scoring);

    tableauWithBlackTwo.moveCardsFrom(foundationWithRedAce);

    expect(scoring.score).toBe(-15);
  }));

  it("should add nothing when foundation moved to foundation", inject(function (scoring) {
    var ace = new Card({rank: "Ace", suit: "Hearts"});
    var foundationWithAce = new FoundationPile([ace], scoring);
    var emptyFoundation = new FoundationPile([], scoring);

    emptyFoundation.moveCardsFrom(foundationWithAce);

    expect(scoring.score).toBe(0);
  }));

  it("should add nothing when tableau moved to tableau", inject(function (scoring) {
    var king = new Card({rank: "King", suit: "Spades"});
    king.turnUp();
    var tableauWithKing = new TableauPile([king], scoring);
    var emptyTableau = new TableauPile([], scoring);

    emptyTableau.moveCardsFrom(tableauWithKing);

    expect(scoring.score).toBe(0);
  }));

  it("should add 5 when tableau card turned over because top was removed", inject(function (scoring) {
    var randomCard = new Card({rank: "10", suit: "Spades"});
    var king = new Card({rank: "King", suit: "Spades"});
    king.turnUp();
    var tableauWithKing = new TableauPile([randomCard, king], scoring);
    var emptyTableau = new TableauPile([], scoring);

    emptyTableau.moveCardsFrom(tableauWithKing);

    expect(scoring.score).toBe(5);
  }));

  it("should not add 5 when tableau card already turned over", inject(function (scoring) {
    var blackKingUp = new Card({rank: "King", suit: "Spades"});
    blackKingUp.turnUp();
    var redAceUp = new Card({rank: "Ace", suit: "Diamons"});
    redAceUp.turnUp();
    var tableau = new TableauPile([blackKingUp, redAceUp], scoring);
    var emptyTableau = new TableauPile([], scoring);

    emptyTableau.moveCardsFrom(tableau);

    expect(scoring.score).toBe(0);
  }));

  it("should subtract 100 when waste recycled", inject(function (scoring) {
    var king = new Card({rank: "King", suit: "Spades"});
    var remainderWithOneCard = new RemainderPile([king], scoring);
    remainderWithOneCard.flipTopCardToWaste();
    scoring.score = 200;

    remainderWithOneCard.flipTopCardToWaste();

    expect(scoring.score).toBe(100);
  }));

  it("should not go negative when waste recycled", inject(function (scoring) {
    var king = new Card({rank: "King", suit: "Spades"});
    var remainderWithOneCard = new RemainderPile([king], scoring);
    remainderWithOneCard.flipTopCardToWaste();
    scoring.score = 50;

    remainderWithOneCard.flipTopCardToWaste();

    expect(scoring.score).toBe(0);
  }));
});
