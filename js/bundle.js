/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  const view = new HanoiView(game, rootEl);
	  view.clickTower();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx);
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function HanoiView(game, $el) {
	  this.game = game;
	  this.$el = $el;
	  this.fromTower = undefined;
	  this.setupTowers();
	  this.render();
	}

	HanoiView.prototype.setupTowers = function() {
	  const $tower0 = $("<ul></ul>");
	  const $tower1 = $("<ul></ul>");
	  const $tower2 = $("<ul></ul>");

	  this.towers = [$tower0, $tower1, $tower2];
	  this.$el.append($tower0).append($tower1).append($tower2);
	};

	HanoiView.prototype.render = function() {
	  $('li').remove();

	  this.game.towers.forEach( (tower, idx) => {
	    tower.forEach((disc) => {
	      let currentDisc = $("<li></li>");

	      currentDisc.attr("style",`width: ${ (disc * 80)}px`);
	      this.towers[idx].append(currentDisc);
	    });
	  });
	};

	HanoiView.prototype.moveDisc = function(toTower) {
	  console.log(`thisFromTower: ${this.fromTower}`);
	  console.log(`toTower: ${toTower}`);
	  if (this.game.isValidMove(this.fromTower, toTower)) {
	    this.game.move(this.fromTower, toTower);
	    this.render();
	    if (this.game.isWon()) {
	      alert("Good work, you!");
	    }
	  } else {
	    alert("Invalid Move!");
	  }
	};

	HanoiView.prototype.clickTower = function() {
	  $('ul').on("click", (event) => {
	    if(this.fromTower === undefined){
	      this.fromTower = this.getIndex(event.currentTarget);
	    }
	    else {
	      this.moveDisc(this.getIndex(event.currentTarget));
	      this.fromTower = undefined;
	    }
	  });
	};

	HanoiView.prototype.getIndex = function(tower) {
	  console.log($('ul').index(tower));
	  return $('ul').index(tower);
	};

	module.exports = HanoiView;


/***/ }
/******/ ]);