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
    circles[c].draw();
  }  

}




class Circle {
  pos = 0;
  diam = 0;
  tpoints = 0;
  angles = 0;
  tlengths = 0;
  nTangents = 0;
  dir = 1;

  constructor (_pos, _diam) {
    this.pos = _pos.copy();
    this.diam = _diam;
    this.tpoints = new Array();
    this.angles = new Array();
    this.tlengths = createVector(10, 10, 0);
    this.nTangents = 10;
    this.addTangentPoints();
  }

  addTangentPoints() {
    let a, x, y, p;
    let n = 0;
    this.tpoints = new Array();

    while (n<this.nTangents) {
      // a = n * (360/this.nTangents);
      a = random(360);

      // let a = random(360);
      x = this.x + this.r * cos(a);
      y = this.y + this.r * sin(a);

      p = createVector(x, y, 0);

      this.tpoints.push(p);
      this.angles.push(a);
      n++;
    }
  }

  draw() {
    // ellipse(this.pos.x, this.pos.y, 5, 5);
    this.drawTangents();
  }
  drawTangents() {
    // this.diam  = sin(frameCount/5)*500;
    this.tlengths.y  = sin(frameCount)*10;
    this.tlengths.x  = 10-this.tlengths.y;
    // this.nTangents += this.dir;
    // if (this.nTangents >= 200 || this.nTangents == 0) this.dir *= -1;
    // this.addTangentPoints();

    for (let tp=0; tp<this.tpoints.length; tp++) {
      this.drawTangent(this.tpoints[tp], true);
    }
  }

  drawTangent(t, drawCircles) {
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

    if (drawCircles)  this.drawExtraCircles(t, pA, pB);
  }

  drawExtraCircles(_t, _a, _b) {
    // stroke(255,0,0);

    let tpoint = _t.copy();
    let nCircles = sin(frameCount/2)*5;
    let initDist = _a.dist(_t);
    let circleDiam = initDist/nCircles;

    for (let c=0; c<nCircles; c++) {
      let dist = _a.dist(tpoint);  
      let ratiodist = (circleDiam / dist);
      let d = _a.copy().sub(tpoint);
      d.mult(ratiodist);
      d = tpoint.copy().add(d.copy());

      let proj = p5.Vector.sub(tpoint, d);

      let nx = proj.x * cos(90) - proj.y * sin(90);
      let ny = proj.x * sin(90) + proj.y * cos(90);
      
      proj.x = nx;
      proj.y = ny;

      proj.normalize();
      proj.mult(this.r);
      proj.add(d);

      // ellipse(_a.x, _a.y, 5, 5);


      // stroke(0,255,0);
      // ellipse(d.x, d.y, 10, 10);

      // stroke(255,0,0);
      ellipse(proj.x, proj.y, this.diam, this.diam);
      // line(d.x,d.y, proj.x,proj.y);

      tpoint = d.copy();
    }
    

    stroke(255);
  }

  update() {
    for (let tp=0; tp<this.tpoints.length; tp++) {
      this.angles[tp]    += (1-(tp/this.tpoints.length))*2;
      this.tpoints[tp].x = this.x + this.r * cos(this.angles[tp]);
      this.tpoints[tp].y = this.y + this.r * sin(this.angles[tp]);
      
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

