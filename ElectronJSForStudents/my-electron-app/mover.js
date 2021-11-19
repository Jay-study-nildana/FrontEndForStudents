let massForRadius = 8;

class Mover {
    constructor(x, y, mass) {
        this.mass = mass;
        this.radius = mass * massForRadius;
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.acceleration = createVector(0, 0);

        //new stuff
        this.angle = 0;
        this.aVelocity = 0;
        this.aAcceleration = 0;
    }

    // Newton's 2nd law: F = M * A
    // or A = F / M
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        // Velocity changes according to acceleration
        this.velocity.add(this.acceleration);
        // position changes by velocity
        this.position.add(this.velocity);
        this.aAcceleration = this.acceleration.x / 10.0;
        this.aVelocity += this.aAcceleration;
        this.aVelocity = constrain(this.aVelocity, -0.1, 0.1);
        this.angle += this.aVelocity;        
        // We must clear acceleration each frame
        this.acceleration.mult(0);
    }

    display() {
        stroke(0);
        strokeWeight(2);
        fill(255, 127);
        ellipse(this.position.x, this.position.y, this.radius * 2);
    }

    display(rgbSetFill, rgbSetStroke, stroke_Weight) {
        strokeWeight(stroke_Weight);
        stroke(rgbSetStroke.red, rgbSetStroke.green, rgbSetStroke.blue);        
        fill(rgbSetFill.red, rgbSetFill.green, rgbSetFill.blue);
        
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        ellipse(0, 0, this.radius * 2);
        line(0, 0, this.radius, 0);
        pop();        
    }
}