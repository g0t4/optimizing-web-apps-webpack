function Scoring() {
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
}

console.log(ENV_IS);

if (ENV_IS_DEVELOPMENT) {
  console.log('[scoring] evaluating');
}

if (module.hot) {

  module.hot.accept(console.log.bind(console));

  const doc = angular.element(document);
  const injector = doc.injector();
  if (injector) {
    const actualService = injector.get("scoring");
    const newScoringService = new Scoring();
    // note: just replaces functions
    Object.keys(actualService)
      .filter(key => typeof actualService[key] === "function")
      .forEach(key => actualService[key] = newScoringService[key]);
    doc.find('html').scope().$apply();
    console.info('[scoring] Hot Swapped!!');
  }
}

angular.module("klondike.scoring", [])
  .service("scoring", [Scoring]);
