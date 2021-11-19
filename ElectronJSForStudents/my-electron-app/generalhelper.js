//beginner background colors for setup

let bg_color_x = 255;
let bg_color_y = 51;
let bg_color_z = 153;

//the max allowed stroke Weight
let stroke_Weight = 20;

let leaveTrail = false;

class colorRGBSet {
    constructor() {
        this.red = random(255);
        this.green = random(255);
        this.blue = random(255);
    }
}