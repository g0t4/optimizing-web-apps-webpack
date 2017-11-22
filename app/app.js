import "!!tee-loader?label=inline-after!babel-loader!tee-loader?label=inline-before!./klondike/scoring.js";
import "./klondike/klondike.js";
import "./klondike/board.js";
import "./klondike/game.js";

angular.module("solitaire", ["klondike", "ngDraggable"]);
