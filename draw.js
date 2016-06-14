// all the frame by frame stuff
var target_pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var show_stats = 0;
// CHEAP USER INTERACTION
alert("HIT ENTER TO SHOW STATS");

window.draw = function() {
    background(255); // white background
    if(!show_stats) {
        window.draw_target(target_pos.x, target_pos.y);
        update();
    } else {
        push();
        fill(0);
        var x = window.innerWidth / 2;
        var y = window.innerHeight / 2;
        textSize(32);
        text("Stats:", x, y);
        text("Accuracy:", x + 50, y + 30);
        var accuracy = (window.stats.shots_hit / window.stats.shots_taken);
        text("" + accuracy, x + 200, y + 30);
        text("Bullseye Shots:", x + 50, y + 60);
        text("" + window.stats.perfect_shots, x + 285, y + 60);
        pop();
    }
};

function update() {
    window.draw_crosshair(window.mouseX, window.mouseY);
}

window.mouseClicked = function() {
    var x = window.mouseX;
    var y = window.mouseY;

    window.stats.shots_taken += 1;

    var distance = dist(x, y, target_pos.x, target_pos.y);
    if(distance <= window.target_outer_radius / 2) {
        window.stats.shots_hit += 1;
        if(distance <= window.target_radius / 2) {
            var data = {};
            data.position = {x: x, y: y};
            data.click_type = "GOOD_HIT";
            data = JSON.stringify(data);
            console.log(data);
            window.stats.perfect_shots += 1; // bullseye
        } else {
            var data = {};
            data.position = {x: x, y: y};
            data.click_type = "HIT";
            data = JSON.stringify(data);
            console.log(data);
        }
    }
    next_move();
}

function next_move() {
    var bounds = window.decision_data;
    var seed = random() * 1000;
    target_pos.x = noise(seed) * bounds.max_x_bound + bounds.min_bound;
    target_pos.y = noise(seed + random() * 50) *
                                bounds.max_y_bound / 2 + bounds.min_bound;
}

function toggle_stats() {
    window.show_stats = window.show_stats ? 0 : 1;
}

function keyPressed() {
    if(keyCode == RETURN || keyCode == ENTER) {
        toggle_stats();
    }
}
