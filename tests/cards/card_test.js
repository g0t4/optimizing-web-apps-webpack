describe("A card", function () {
  "use strict";

  it("should link to the image of the suit and rank", function () {
    expect(new Card({rank: "King", suit: "Spades"}).image).toBe("6.png");
    expect(new Card({rank: "8", suit: "Hearts"}).image).toBe("27.png");
    expect(new Card({rank: "Ace", suit: "Diamonds"}).image).toBe("4.png");
    expect(new Card({rank: "2", suit: "Clubs"}).image).toBe("49.png");
  });

  it("should map its color to black or red based on suit", function () {
    expect(new Card({suit: "Spades"}).color).toBe("black");
    expect(new Card({suit: "Hearts"}).color).toBe("red");
    expect(new Card({suit: "Diamonds"}).color).toBe("red");
    expect(new Card({suit: "Clubs"}).color).toBe("black");
  });

});
