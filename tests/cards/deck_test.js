describe("A deck of cards", function () {
  "use strict";

  it("should have 52 cards", inject(function () {
    expect(new Deck().unShuffled().length).toBe(52);
  }));

  it("should start with aces", inject(function () {
    var cards = new Deck().unShuffled();

    expect(cards[0].rank).toEqual("Ace");
    expect(cards[0].suit).toEqual("Clubs");

    expect(cards[1].rank).toEqual("Ace");
    expect(cards[1].suit).toEqual("Spades");

    expect(cards[2].rank).toEqual("Ace");
    expect(cards[2].suit).toEqual("Hearts");

    expect(cards[3].rank).toEqual("Ace");
    expect(cards[3].suit).toEqual("Diamonds");
  }));

  it("should end with twos", inject(function () {
    var cards = new Deck().unShuffled();

    expect(cards[48].rank).toEqual("2");
    expect(cards[48].suit).toEqual("Clubs");

    expect(cards[49].rank).toEqual("2");
    expect(cards[49].suit).toEqual("Spades");

    expect(cards[50].rank).toEqual("2");
    expect(cards[50].suit).toEqual("Hearts");

    expect(cards[51].rank).toEqual("2");
    expect(cards[51].suit).toEqual("Diamonds");
  }));

  it("should shuffle", inject(function () {
    var unShuffled = new Deck().unShuffled();

    var shuffled = new Deck().shuffled();

    expect(shuffled).not.toEqual(unShuffled);
  }));

});
