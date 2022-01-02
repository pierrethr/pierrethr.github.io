let w, h;

let circleCenter;

let stripedCircles = new Array();

const addDelay = 1000;
let lastAddTime = 0;
const maxStripedCircles = 1;

const drawPoints = false;



// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);

  circleCenter = createVector(0, 0);

  addStripedCircle();
}


// --------------------------------------------
function draw() {
  clear();

  if (millis() - lastAddTime >= addDelay)   addStripedCircle();

  noFill();
  stroke(255);

  push();
  translate(w/2, h/2);

    // draw all striped circles
    for (let sc=0; sc<stripedCircles.length; sc++) {
      // rotate(sin(frameCount-((sc+1)*(360/stripedCircles.length)))*360);
      stripedCircles[sc].draw();
    }
  
  pop();

}

// --------------------------------------------
function addStripedCircle() {
  if (stripedCircles.length >= maxStripedCircles) return;
  stripedCircles.push(new StripedCircle());
  lastAddTime = millis();
}


// --------------------------------------------
// from       https://stackoverflow.com/questions/57891494/how-to-calculate-intersection-point-of-a-line-on-a-circle-using-p5-js
// based on   https://mathworld.wolfram.com/Circle-LineIntersection.html

function intersectLineCircle (p1, p2, cpt, r) {

  let sign = function(x) { return x < 0.0 ? -1 : 1; };

  let x1 = p1.copy().sub(cpt);
  let x2 = p2.copy().sub(cpt);

  let dv = x2.copy().sub(x1)
  let dr = dv.mag();
  let D = x1.x*x2.y - x2.x*x1.y;

  // evaluate if there is an intersection
  let di = r*r*dr*dr - D*D;
  if (di < 0.0)
      return [];
 
  let t = sqrt(di);

  ip = [];
  ip.push( new p5.Vector(D*dv.y + sign(dv.y)*dv.x * t, -D*dv.x + abs(dv.y) * t).div(dr*dr).add(cpt) );
  if (di > 0.0) {
      ip.push( new p5.Vector(D*dv.y - sign(dv.y)*dv.x * t, -D*dv.x - abs(dv.y) * t).div(dr*dr).add(cpt) ); 
  }
  return ip;
}


// ================================================================
class StripedCircle {
  circleDiam = 500;
  stripes = new Array();
  nStripes = null;
  stripeW = (this.circleDiam-20) / this.nStripes;
  stripeH = this.circleDiam * 1.1;

  // --------------------------------------------
  constructor () {
    this.nStripes = 11;
    // this.circleDiam = random(100, 700);

    if (this.nStripes % 2 == 0)  this.nStripes-1;

    this.createStripes();
  }

  // --------------------------------------------
  createStripes() {
    this.stripeW = (this.circleDiam-20) / this.nStripes;

    this.stripes = new Array();
    for (let s=0; s<this.nStripes; s++) {
      let pts = new Array(  createVector((s*this.stripeW)-(this.circleDiam/2)+10, -(this.circleDiam/2)),
                            createVector((s*this.stripeW)+this.stripeW-(this.circleDiam/2)+10, -(this.circleDiam/2))
                          );

      this.stripes.push(new Stripe(pts));
    }
  }

  // --------------------------------------------
  draw () {

    stroke(255);
    noFill();
    
    this.stretchStripes();  // update width of stripes
    // this.circleDiam += (sin(frameCount)*5); // update circle diameter

    // calculate all intersection points of both vertical lines
    for (let s=0; s<this.nStripes; s+=2) {
      let allIntersects = new Array();
      let lineIntersects;
      for (let p=0; p<this.stripes[s].topPoints.length; p++) {
        lineIntersects = intersectLineCircle(this.stripes[s].topPoints[p], this.stripes[s].bottomPoints[p], circleCenter, this.circleDiam/2);
        for (let i=0; i<lineIntersects.length; i++) {
          allIntersects.push(lineIntersects[i]);
        }
      }

      this.stripes[s].intersects = allIntersects; // update
      this.stripes[s].draw(); // draw the stripe
    }
    
    if (drawPoints) {
      for (let s=0; s<this.nStripes; s+=2) {
        for (let i=0; i<allIntersects.length; i++) {
          noStroke();
          fill(0, 0, 0);
          ellipse(allIntersects[i].x, allIntersects[i].y, this.circleDiam/30, this.circleDiam/30);
        }
      }
    }
  }

  // --------------------------------------------
  // calculate all intersection points of both vertical lines for each stripe
  getIntersects() {
    for (let s=0; s<this.nStripes; s+=2) {
      let allIntersects = new Array();
      let lineIntersects;
      for (let p=0; p<this.stripes[s].topPoints.length; p++) {
        lineIntersects = intersectLineCircle(this.stripes[s].topPoints[p], this.stripes[s].bottomPoints[p], circleCenter, this.circleDiam/2);
        for (let i=0; i<lineIntersects.length; i++) {
          allIntersects.push(lineIntersects[i]);
        }
      }

      this.stripes[s].intersects = allIntersects; // update
      this.stripes[s].draw(); // draw the stripe
    }
  }

  // --------------------------------------------
  stretchStripes() {
    for (let s=0; s<this.stripes.length; s++) {
      this.stripes[s].stretch(sin(frameCount)*1);
    }
  }

}


// ================================================================
class Stripe {
  pos = null;
  topPoints = new Array(2);     // 0 = top left     1 = top right
  bottomPoints = new Array(2);  // 0 = bottom left  1 = bottom right
  intersects = null;            // contains vectors of lines intersections with circle

  // --------------------------------------------
  constructor(_points) {
    this.topPoints[0] = _points[0].copy();
    this.topPoints[1] = _points[1].copy();

    this.bottomPoints[0] = createVector(this.topPoints[0].x, this.topPoints[0].y + this.stripeH);
    this.bottomPoints[1] = createVector(this.topPoints[1].x, this.topPoints[1].y + this.stripeH);
  }

  // --------------------------------------------
  draw() {

    // line(this.topPoints[0].x, this.topPoints[0].y, this.bottomPoints[0].x, this.bottomPoints[0].y);
    // line(this.topPoints[1].x, this.topPoints[1].y, this.bottomPoints[1].x, this.bottomPoints[1].y );

    if (this.intersects) {
      if (this.intersects.length == 4) {
        quad( this.intersects[0].x, this.intersects[0].y, 
              this.intersects[2].x, this.intersects[2].y, 
              this.intersects[3].x, this.intersects[3].y,
              this.intersects[1].x, this.intersects[1].y  );
      }
    }
  }

  // --------------------------------------------
  stretch(_amt) {
    this.topPoints[0].add(_amt*-1, 0);
    this.bottomPoints[0].add(_amt*-1, 0);

    this.topPoints[1].add(_amt, 0);
    this.bottomPoints[1].add(_amt, 0);
  }
}