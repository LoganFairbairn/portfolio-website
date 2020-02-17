var canvas;
let canvasHeight = 0;
let canvasWidth = 0;
const particleSize = 3;
const particles = [];
const linkDistance = 300;

function setup() {
  calculateCanvasSize();

  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  let particlesLength = Math.min(Math.floor(window.innerWidth / 2), 100);

  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(20);

  particles.forEach((particle, idx) => {
    particle.update();
    particle.draw();
    particle.checkParticles(particles.slice(idx));
  });
}

function windowResized() {
  calculateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function deviceTurned() {
  calculateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function calculateCanvasSize() {
  canvasWidth = window.innerWidth;

  canvasHeight = 0;

  var sections = document.getElementsByClassName("main-section");
  console.log("Number of sections: " + sections.length.toString());
  for (let i = 0; i < sections.length; i++) {
    canvasHeight += sections[i].scrollHeight;
  }

  console.log(canvasHeight);
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.size = particleSize;
  }

  update() {
    this.pos.add(this.vel);
    this.bounceOffWindowEdge();
  }

  draw() {
    noStroke();
    fill(255, 255, 255, 50);
    circle(this.pos.x, this.pos.y, this.size * 2);
  }

  bounceOffWindowEdge() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  checkParticles(particles) {
    particles.forEach(particle => {
      const distance = dist(
        this.pos.x,
        this.pos.y,
        particle.pos.x,
        particle.pos.y
      );
      if (distance < linkDistance) {
        const alpha = map(distance, 0, 120, 0, 0.05);
        stroke(`rgba(255, 255, 255, ${alpha})`);
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
