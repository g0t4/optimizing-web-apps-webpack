describe("A tableau pile", function () {
  "use strict";

  beforeEach(module("klondike.scoring"));

  it("that is empty will accept a king", function () {
    var king = new Card({rank: "King", suit: "Clubs"});
    var tableau = new TableauPile();

    var accepted = tableau.drop(king);

    expect(accepted).toBe(true);
    expect(tableau.topCard()).toBe(king);
  });

  it("that is empty will not accept a rank other than king", function () {
    var ace = new Card({rank: "Ace", suit: "Clubs"});
    var tableau = new TableauPile();

    var accepted = tableau.drop(ace);

    expect(accepted).toBe(false);
    expect(tableau.isEmpty()).toBe(true);
  });

  it("will accept lower rank in alternate color", function () {
    var kingOfClubs = new Card({rank: "King", suit: "Clubs"});
    var tableau = new TableauPile();
    tableau.drop(kingOfClubs);
    var queenOfHearts = new Card({rank: "Queen", suit: "Hearts"});

    var accepted = tableau.drop(queenOfHearts);

    expect(accepted).toBe(true);
    expect(tableau.topCard()).toBe(queenOfHearts);
  });

  it("will not accept lower rank in same color", function () {
    var kingOfClubs = new Card({rank: "King", suit: "Clubs"});
    var tableau = new TableauPile();
    tableau.drop(kingOfClubs);
    var queenOfClubs = new Card({rank: "Queen", suit: "Clubs"});

    var accepted = tableau.drop(queenOfClubs);

    expect(accepted).toBe(false);
    expect(tableau.topCard()).toBe(kingOfClubs);
  });

  it("will not accept different color if not next lower rank", function () {
    var kingOfClubs = new Card({rank: "King", suit: "Clubs"});
    var tableau = new TableauPile();
    tableau.drop(kingOfClubs);
    var jackOfHearts = new Card({rank: "Jack", suit: "Hearts"});

    var accepted = tableau.drop(jackOfHearts);

    expect(accepted).toBe(false);
    expect(tableau.topCard()).toBe(kingOfClubs);
  });

  it("will flip over next card if top card removed", inject(function (scoring) {
    var kingOfClubs = new Card({rank: "King", suit: "Clubs"});
    var tableau = new TableauPile([], scoring);
    tableau.addTopCard(kingOfClubs);
    var jackOfHearts = new Card({rank: "Jack", suit: "Hearts"});
    tableau.addTopCard(jackOfHearts);
    expect(kingOfClubs.turnedUp).toBe(false);

    tableau.removeCard(jackOfHearts);

    expect(kingOfClubs.turnedUp).toBe(true);
  }));

  it("will not error if no next card after removing top", function () {
    var jackOfHearts = new Card({rank: "Jack", suit: "Hearts"});
    var tableau = new TableauPile();
    tableau.addTopCard(jackOfHearts);

    tableau.removeCard(jackOfHearts);
  });

  it("will not error if event received to move from pile that doesn't exist", function () {
    var source = new TableauPile([]);

    source.moveCardsFrom(null);
  });

  it("will accept all of another tableau", inject(function (scoring) {
    var hidden = new Card({rank: "10", suit: "Hearts"});
    var blackFour = new Card({rank: "4", suit: "Spades"});
    blackFour.turnUp();
    var redThree = new Card({rank: "3", suit: "Hearts"});
    redThree.turnUp();
    var source = new TableauPile([hidden, blackFour, redThree], scoring);

    var redFive = new Card({rank: "5", suit: "Hearts"});
    redFive.turnUp();
    var destination = new TableauPile([redFive], scoring);

    destination.moveCardsFrom(source);

    expect(source.cards).toEqual([hidden]);
    expect(destination.cards).toEqual([redFive, blackFour, redThree]);
    expect(hidden.turnedUp).toBe(true);
  }));

  it("will accept part of another tableau", function () {
    var hidden = new Card({rank: "10", suit: "Hearts"});
    var redDiamond = new Card({rank: "5", suit: "Diamonds"});
    redDiamond.turnUp();
    var blackFour = new Card({rank: "4", suit: "Spades"});
    blackFour.turnUp();
    var redThree = new Card({rank: "3", suit: "Hearts"});
    redThree.turnUp();
    var source = new TableauPile([hidden, redDiamond, blackFour, redThree]);

    var redHeart = new Card({rank: "5", suit: "Hearts"});
    redHeart.turnUp();
    var destination = new TableauPile([redHeart]);

    destination.moveCardsFrom(source);

    expect(source.cards).toEqual([hidden, redDiamond]);
    expect(destination.cards).toEqual([redHeart, blackFour, redThree]);
  });

  it("will not accept turned down part of another tableau", function () {
    var blackFourDown = new Card({rank: "4", suit: "Spades"});
    var redThree = new Card({rank: "3", suit: "Hearts"});
    redThree.turnUp();
    var source = new TableauPile([blackFourDown, redThree]);

    var redHeart = new Card({rank: "5", suit: "Hearts"});
    redHeart.turnUp();
    var destination = new TableauPile([redHeart]);

    destination.moveCardsFrom(source);

    expect(source.cards).toEqual([blackFourDown, redThree]);
    expect(destination.cards).toEqual([redHeart]);
  });

  it("will not accept multiple from a pile that isn't another tableau", function () {
    var blackFour = new Card({rank: "4", suit: "Spades"});
    blackFour.turnUp();
    var redThree = new Card({rank: "3", suit: "Hearts"});
    redThree.turnUp();
    var remainder = new RemainderPile([blackFour, redThree]);

    var redFive = new Card({rank: "5", suit: "Hearts"});
    redFive.turnUp();
    var tableau = new TableauPile([redFive]);

    tableau.moveCardsFrom(remainder);

    expect(remainder.cards).toEqual([blackFour, redThree]);
    expect(tableau.cards).toEqual([redFive]);
  });
});
