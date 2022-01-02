let w = 500;
let h = 1000;
let xmin, xmax;
let boxw;
const maxParticles  = 300;
let particlesCount = 10;
let direction = 1;
let speed = 3;
const particles = new Array(maxParticles);
let agent;
let agentRadius = 150;

// --------------------------------------------
function setup() {
  w = displayWidth;
  h = displayHeight;

  createCanvas(w, h);

  agent = new Agent();
  xmin = agent.pos.x - 300;
  xmax = agent.pos.x + 300;

  for (let p=0; p<maxParticles; p++) {
    particles[p] = new Particle(p, createVector(random(xmin, xmax), random(h)), random(speed)+1);
  }
}


function draw() {
  background(0);
  update();

  if (particlesCount == maxParticles || particlesCount == 9) {
    direction *= -1;
  }
  
  if (frameCount % 50 == 0) {
    particlesCount += direction;
  }
  
  

  for (let p=0; p<particlesCount; p++) {
    particles[p].draw();
  }

  agent.draw();

}

function update() {
  for (let p=0; p<particlesCount; p++) {
    particles[p].update();
  }
}


// --------------------------------------------
class Agent {
  pos = createVector(width/2, height/2);

  draw() {
    fill(255);
    noStroke();

    ellipse(this.pos.x, this.pos.y, 10, 10);

    stroke(255);
    for (let p=0; p<particlesCount; p++) {
      let dist = this.pos.dist(particles[p].pos);
      if (dist <= agentRadius) {
        line(this.pos.x, this.pos.y, particles[p].pos.x, particles[p].pos.y);
        particles[p].touched = true;
      }
    }

  }
}

// --------------------------------------------
class Particle {  
  id = 0;
  pos = 0;
  speed = 0;
  touched = false;

  constructor(_id, _pos, _speed) {
    this.id = _id;
    this.pos = _pos;
    this.speed = _speed;
  }

  update() {
    this.pos.y += this.speed;
    // this.pos.x += random(-5,5);

    if (this.pos.y > height)  {
      this.reset();
    }
  }

  reset() {
    this.pos.y = -20;
    this.pos.x = random(xmin, xmax);
  }

  draw() {
    fill(0);
    // fill(255 * this.touched);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }
  
}