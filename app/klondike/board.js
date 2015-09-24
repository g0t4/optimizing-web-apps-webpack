(function () {
  "use strict";

  angular.module("klondike.board", ["ngRoute", "klondike.game"])
    .config(["$routeProvider", function ($routeProvider) {
      $routeProvider
        .when("/board", {
          templateUrl: "klondike/board.html",
          controller: "KlondikeController"
        })
        .otherwise({redirectTo: "/board"});
    }])
    .controller("KlondikeController", ["$scope", "klondikeGame", "scoring", function KlondikeController($scope, klondikeGame, scoring) {
      klondikeGame.newGame();
      $scope.game = klondikeGame;
      $scope.scoring = scoring;
    }])
    .directive("sNoPile", function noPileFactory() {
      return {
        restrict: "E",
        template: "<div class=\"no-pile\"></div>"
      };
    })
    .directive("sTableau", function tableauFactory() {
      return {
        restrict: "E",
        templateUrl: "klondike/piles/tableau.html"
      };
    })
    .directive("sFoundation", function tableauFactory() {
      return {
        restrict: "E",
        templateUrl: "klondike/piles/foundation.html"
      };
    })
    .directive("sCard", function cardFactory() {
      return {
        restrict: "E",
        templateUrl: "cards/card.html",
        scope: {
          card: "="
        }
      };
    })
    .directive("sStackedPile", function cardFactory() {
      return {
        restrict: "E",
        templateUrl: "klondike/piles/stacked-pile.html",
        scope: {
          pile: "="
        }
      };
    });

})();
