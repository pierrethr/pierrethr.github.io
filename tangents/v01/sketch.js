let w, h;

let circles = new Array();
let debug = false;

const updateRate = 10;
let lastUpdateTime = 0;


// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  // ellipseMode(CORNER);
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);
  circles.push(new Circle(createVector(w/2, h/2), 100));

  

}

// --------------------------------------------
function draw() {
  clear();
  noFill();
  stroke(255);

  for (let c=0; c<circles.length; c++) {
    if (millis() - lastUpdateTime >= updateRate)  circles[c].update();

    ellipse(circles[c].x, circles[c].y, circles[c].diam, circles[c].diam);
    circles[c].drawTangents();
  }  

}




class Circle {
  pos = 0;
  diam = 0;
  tpoints = 0;
  tlengths = 0;
  nTangents = 0;
  dir = 1;

  constructor (_pos, _diam) {
    this.pos = _pos.copy();
    this.diam = _diam;
    this.tpoints = new Array();
    this.tlengths = createVector(10, 10);
    this.nTangents = 10;
    this.addTangentPoints();
  }

  addTangentPoints() {
    let a, x, y, p;
    let n = 0;
    this.tpoints = new Array();

    while (n<this.nTangents) {
      a = n * (360/this.nTangents);

      // let a = random(360);
      x = this.x + this.r * cos(a);
      y = this.y + this.r * sin(a);

      p = createVector(x, y, a);

      this.tpoints.push(p);
      n++;
    }
  }

  drawTangents() {
    this.diam  = sin(frameCount/5)*500;
    this.tlengths.y  = sin(frameCount)*10;
    this.tlengths.x  = 10-this.tlengths.y;
    this.nTangents += this.dir;
    if (this.nTangents >= 200 || this.nTangents == 0) this.dir *= -1;
    this.addTangentPoints();

    for (let tp=0; tp<this.tpoints.length; tp++) {
      this.drawTangent(this.tpoints[tp]);
    }
  }

  drawTangent(t) {
    // ellipse(t.x, t.y, 5, 5);
    let pA = p5.Vector.sub(this.pos, t);  // external point
    pA.mult(this.tlengths.x);
    let nx = pA.x * cos(90) - pA.y * sin(90);
    let ny = pA.x * sin(90) + pA.y * cos(90);

    pA.x = nx;
    pA.y = ny;
  
    pA.add(t);

    let pB = p5.Vector.sub(this.pos, t);  // external point
    pB.mult(this.tlengths.y);
    nx = pB.x * cos(-90) - pB.y * sin(-90);
    ny = pB.x * sin(-90) + pB.y * cos(-90);

    pB.x = nx;
    pB.y = ny;
  
    pB.add(t);


    line (t.x, t.y, pA.x, pA.y);
    line(t.x, t.y, pB.x, pB.y);
  }

  update() {
    for (let tp=0; tp<this.tpoints.length; tp++) {
      this.tpoints[tp].z += (1-(tp/this.tpoints.length))*2;
      this.tpoints[tp].x = this.x + this.r * cos(this.tpoints[tp].z);
      this.tpoints[tp].y = this.y + this.r * sin(this.tpoints[tp].z);
      
    }
    lastUpdateTime = millis();
  }

  
  get x() { return this.pos.x; }
  set x(v) {  this.pos.x = v; }

  get y() { return this.pos.y; }
  set y(v) {  this.pos.y = v; }

  get r() { return this.diam/2; }
  set r(v) { this.diam = v*2; }
}

