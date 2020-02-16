var canvas;
const numberOfSections = 4;
const particleSize = 3;
const particles = [];
const linkDistance = 300;

function setup() {
  canvas = createCanvas(
    window.innerWidth,
    window.innerHeight * numberOfSections
  );
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
    particle.avoidCursor();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 4);
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

  avoidCursor() {
    const distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);

    if (distance < 100) {
      this.vel.x *= -1;
      this.vel.y *= -1;
    }
  }
}
