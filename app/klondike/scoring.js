angular.module("klondike.scoring", [])
  .service("scoring", [function Scoring() {
    "use strict";

    this.score = 0;

    this.newGame = function () {
      this.score = 0;
    };
    this.tableauCardTurnedUp = function () {
      this.score += 5;
    };
    this.dropped = function (source, destionation) {
      this.score += scoreForMoving(source, destionation) || 0;
    };
    this.wasteRecycled = function () {
      this.score = Math.max(this.score - 100, 0);
    };

    function scoreForMoving(source, destionation) {
      if (destionation.name === "TableauPile") {
        if (source.name === "FoundationPile") {
          return -15;
        }
        return 5;
      }
      if (destionation.name === "FoundationPile") {
        if (source.name === "TableauPile" || source.name === "WastePile") {
          return 10;
        }
      }
    }
  }]);
