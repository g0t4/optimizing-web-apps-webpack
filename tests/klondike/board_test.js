describe("A klondike board controller", function () {
  "use strict";

  beforeEach(module("klondike"));

  var scope;
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    $controller("KlondikeController", {$scope: scope});

    expect(scope.game).toBeDefined();
    expect(scope.game.tableaus).toBeDefined();
  }));

  it("should load a new game", function () {
    expect(scope.game).toBeDefined();
    expect(scope.game.tableaus).toBeDefined();
  });

  it("should load the score", function () {
    expect(scope.scoring).toBeDefined();
    expect(scope.scoring.score).toBe(0);
  });
});
