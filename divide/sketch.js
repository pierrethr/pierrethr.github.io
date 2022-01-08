let w, h;

let circles = new Array();
let debug = false;

// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  // ellipseMode(CORNER);
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL);
  
  circles.push(new Circle(0, createVector(0, 0), 100, 90));
  circles.push(new Circle(1, createVector(0, 0), 100, 90));

  circles[0].other = circles[1];
  circles[1].other = circles[0];
}

// --------------------------------------------
function draw() {
  clear();


  noFill();
  stroke(255);

  for (let c=0; c<circles.length; c++) {
    push();
    rotateZ(circles[c].rotation);
    circles[c].draw();
    pop();

    console.log(circles[c].id);
  }

}

function setupNextAnim(_circle) {
  // console.log("setup " + _circle.pos); 
  let addat = -1;
  
  for (let c=0; c<circles.length; c++) {
    if (circles[c] == _circle) {
      addat = c;
    }
  }

  if(addat == -1) return;

  let newid = _circle.id+1;
  let newcircle = new Circle(newid, _circle.pos.copy(), _circle.diam, _circle.rotation);
  circles.splice(addat, 0, newcircle);
  
  newcircle.other = _circle;
  _circle.other = newcircle;

  _circle.anim = true;
  newcircle.anim = true;

  
}


class Circle {
  id = null;
  pos = null;
  rotation = null;
  initDiam = null;
  diam = null;
  other = null;
  top = null;
  bottom = null;
  tailtop = null;
  tailbottom = null;
  anim = false;
  

  constructor (_id, _pos, _diam, _rotation) {
    this.id = _id;
    this.pos = _pos.copy();
    this.rotation = _rotation;
    this.diam = _diam;
    this.initDiam = _diam;

    this.top = this.pos.copy().sub(0, _diam);
    this.tailtop = this.top.copy();

    this.bottom = this.pos.copy().add(0, _diam);
    this.tailbottom = this.bottom.copy();

    this.anim = true;
  }

  draw() {

    if (!this.other)  return;


    stroke(255);
    
    

    let d;
    let overlap;
    let overlapdiff;
    let angle;
    let x, y;


    fill(255);
    ellipse(this.pos.x, this.pos.y, this.diam, this.diam);
    if (!this.anim) return;

    // stroke(0, 255, 0);
    if (this.id % 2 == 0) {
      fill(255);
      if (this.tailbottom.y <= this.pos.y)  this.animDone();
      
      this.pos.add(.5  , 0);
      line(this.pos.x, this.pos.y, this.pos.x + (this.diam/2), this.pos.y);

      d = this.pos.dist(this.other.pos);
      overlap = this.diam-d;
      overlapdiff = (this.diam-overlap)/2;
      angle = (overlapdiff / (this.diam))*70;
      // console.log(angle);
      
      x = this.pos.x - ((this.diam/2)  *  cos(90-angle));
      y = this.pos.y - ((this.diam/2)  *  sin(90-angle));

      this.top = createVector(x, y);
      if (debug)  ellipse(this.top.x, this.top.y, 10, 10);

      y = this.pos.y - ((this.diam/2)  *  sin(270-angle));
      this.bottom = this.top.copy();
      this.bottom.y = y;
      if (debug)  ellipse(this.bottom.x, this.bottom.y, 10, 10);

      // x = this.pos.x + ((this.diam/2)  *  cos(angle*1.2-90)) + (((this.diam/4)  *  cos(angle*1.2-90)));
      x = this.top.x - overlapdiff;
      x -= (x - this.top.x)/2;
      y = constrain(this.pos.y - ((this.diam/2)  *  sin(90-(angle*1.2))), this.pos.y - (this.diam/2), this.pos.y);
      
      this.tailtop = createVector(x, y);
      stroke(255,0,0);
      if (debug)  ellipse(this.tailtop.x, this.tailtop.y, 10, 10);

      y = constrain(this.pos.y + ((this.diam/2)  *  sin(90-(angle*1.2))), this.pos.y, this.pos.y + (this.diam/2));
      this.tailbottom = createVector(x, y);
      stroke(255,0,0);
      if (debug)  ellipse(this.tailbottom.x, this.tailbottom.y, 10, 10);

      noStroke();
      fill(255);
      quad( this.top.x, this.top.y, 
            this.tailtop.x, this.tailtop.y, 
            this.tailbottom.x, this.tailbottom.y, 
            this.bottom.x, this.bottom.y);
      noFill();

      
    } else {
      if (this.tailbottom.y <= this.pos.y)  this.animDone();

      this.pos.add(-.5  , 0);
      line(this.pos.x, this.pos.y, this.pos.x + (this.diam/2), this.pos.y);

      d = this.pos.dist(this.other.pos);
      overlap = this.diam-d;
      overlapdiff = (this.diam-overlap)/2;
      angle = (overlapdiff / (this.diam))*70;
      // console.log(angle);
      
      x = this.pos.x + ((this.diam/2)  *  cos(angle-90));
      y = this.pos.y + ((this.diam/2)  *  sin(angle-90));

      this.top = createVector(x, y);
      if (debug)  ellipse(this.top.x, this.top.y, 10, 10);

      y = this.pos.y - ((this.diam/2)  *  sin(angle-90));
      this.bottom = this.top.copy();
      this.bottom.y = y;
      if (debug)  ellipse(this.bottom.x, this.bottom.y, 10, 10);

      // x = this.pos.x + ((this.diam/2)  *  cos(angle*1.2-90)) + (((this.diam/4)  *  cos(angle*1.2-90)));
      x = this.top.x + overlapdiff;
      x -= (x - this.top.x)/2;
      y = constrain(this.pos.y + ((this.diam/2)  *  sin((angle*1.2)-90)), this.pos.y - (this.diam/2), this.pos.y);
      
      this.tailtop = createVector(x, y);
      stroke(255,0,0);
      if (debug)  ellipse(this.tailtop.x, this.tailtop.y, 10, 10);

      y = constrain(this.pos.y + ((this.diam/2)  *  sin((angle*1.2)+90)), this.pos.y, this.pos.y + (this.diam/2));
      this.tailbottom = createVector(x, y);
      stroke(255,0,0);
      if (debug)  ellipse(this.tailbottom.x, this.tailbottom.y, 10, 10);

      noStroke();
      fill(255);
      quad( this.top.x, this.top.y, 
            this.tailtop.x, this.tailtop.y, 
            this.tailbottom.x, this.tailbottom.y, 
            this.bottom.x, this.bottom.y);
      noFill();

    }

    this.diam = this.initDiam - (d/6);
    
  }

  animDone() {
    this.anim = false;
    // this.rotation += 90;
    setupNextAnim(this);
  }
}