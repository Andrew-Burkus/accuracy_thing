// setup function and init stuff
var target_radius = 45;
var target_outer_radius = 130;
var cross_hair_radius = 50;
var canvas = document.getElementById('canvas');

var stats = {
    shots_taken: 0,
    shots_hit: 0,
    perfect_shots: 0 // basically bullseye
};

window.setup = function() {
    window.canvas = createCanvas(window.innerWidth, window.innerHeight);
    noCursor();
    noFill();
};

var decision_data = {
    max_x_bound: window.innerWidth,
    max_y_bound: window.innerHeight,
    min_bound: target_outer_radius + 15 // don't appear offscreen
};

// target user is trying to hit
window.draw_target = function(x, y) {
    push();
    strokeWeight(1.5);
    ellipse(x, y, target_radius, target_radius);
    ellipse(x, y, target_outer_radius, target_outer_radius);
    pop();
};
// user crosshair
window.draw_crosshair = function(x, y) {
    push();
    strokeWeight(2.0);
    stroke(230, 20, 20);
    ellipse(x, y, cross_hair_radius, cross_hair_radius);
    // draw crosshair lines
    var x1 = x + 75;
    var y1 = y + 75;
    var x2 = x - 75;
    var y2 = y - 75;
    line(x1, y, x2, y);
    line(x, y1, x, y2);
    pop();
}

window.update_target = function(x, y) {
    target_position.x = x;
    target_position.y = y;
};

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.resize(w, h);
  width = w;
  height = h;
};
