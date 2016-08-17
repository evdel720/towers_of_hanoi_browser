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
