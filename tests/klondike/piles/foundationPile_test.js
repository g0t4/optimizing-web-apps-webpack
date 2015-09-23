describe("A foundation pile", function () {
  "use strict";

  it("that is empty will accept an ace", function () {
    var ace = new Card({rank: "Ace", suit: "Clubs"});
    var foundation = new FoundationPile();

    var accepted = foundation.drop(ace);

    expect(accepted).toBe(true);
    expect(foundation.topCard()).toBe(ace);
  });

  it("that is empty will not accept a rank other than ace", function () {
    var king = new Card({rank: "King", suit: "Clubs"});
    var foundation = new FoundationPile();

    var accepted = foundation.drop(king);

    expect(accepted).toBe(false);
    expect(foundation.isEmpty()).toBe(true);
  });

  it("will accept next rank in same suit", function() {
    var aceOfClubs = new Card({rank: "Ace", suit: "Clubs"});
    var foundation = new FoundationPile();
    foundation.drop(aceOfClubs);
    var twoOfClubs = new Card({rank: "2", suit: "Clubs"});

    var accepted = foundation.drop(twoOfClubs);

    expect(accepted).toBe(true);
    expect(foundation.topCard()).toBe(twoOfClubs);
  });

  it("will not accept same suit but not next rank", function() {
    var aceOfClubs = new Card({rank: "Ace", suit: "Clubs"});
    var foundation = new FoundationPile();
    foundation.drop(aceOfClubs);
    var threeOfClubs = new Card({rank: "3", suit: "Clubs"});

    var accepted = foundation.drop(threeOfClubs);

    expect(accepted).toBe(false);
    expect(foundation.topCard()).toBe(aceOfClubs);
  });

  it("will not accept different suit", function() {
    var aceOfClubs = new Card({rank: "Ace", suit: "Clubs"});
    var foundation = new FoundationPile();
    foundation.drop(aceOfClubs);
    var twoOfHearts = new Card({rank: "2", suit: "Hearts"});

    var accepted = foundation.drop(twoOfHearts);

    expect(accepted).toBe(false);
    expect(foundation.topCard()).toBe(aceOfClubs);
  });
});
