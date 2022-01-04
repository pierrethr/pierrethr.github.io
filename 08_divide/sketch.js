let w, h;

let circles = new Array();

// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  // ellipseMode(CORNER);
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);
  
  circles.push(new Circle(0, createVector(300, 300), 100));
  circles.push(new Circle(1, createVector(300, 300), 100));

  circles[0].other = circles[1];
  circles[1].other = circles[0];
}

// --------------------------------------------
function draw() {
  clear();



  noFill();
  stroke(255);

  for (let c=0; c<circles.length; c++) {
    circles[c].draw();
  }

}


class Circle {
  id = null;
  pos = null;
  diam = null;
  other = null;
  top = null;
  bottom = null;
  tailtop = null;
  tailbottom = null;
  

  constructor (_id, _pos, _diam) {
    this.id = _id;
    this.pos = _pos.copy();
    this.diam = _diam;
  }

  draw() {

    if (!this.other)  return;


    stroke(255);
    
    

    let d;
    let overlap;
    let overlapdiff;
    let angle;
    let x, y;


    stroke(0, 255, 0);
    if (this.id % 2 == 0) {
      ellipse(this.pos.x, this.pos.y, this.diam, this.diam);
      
      this.pos.add(.5  , 0);
      line(this.pos.x, this.pos.y, this.pos.x + (this.diam/2), this.pos.y);

      d = this.pos.dist(this.other.pos);
      overlap = this.diam-d;
      overlapdiff = (this.diam-overlap)/2;
      angle = (overlapdiff / (this.diam))*70;
      console.log(angle);
      
      x = this.pos.x - ((this.diam/2)  *  cos(90-angle));
      y = this.pos.y - ((this.diam/2)  *  sin(90-angle));

      this.top = createVector(x, y);
      ellipse(this.top.x, this.top.y, 10, 10);

      y = this.pos.y - ((this.diam/2)  *  sin(270-angle));
      this.bottom = this.top.copy();
      this.bottom.y = y;
      ellipse(this.bottom.x, this.bottom.y, 10, 10);

      // x = this.pos.x + ((this.diam/2)  *  cos(angle*1.2-90)) + (((this.diam/4)  *  cos(angle*1.2-90)));
      x = this.top.x - overlapdiff;
      x -= (x - this.top.x)/2;
      y = constrain(this.pos.y - ((this.diam/2)  *  sin(90-(angle*1.2))), this.pos.y - (this.diam/2), this.pos.y);
      
      this.tailtop = createVector(x, y);
      stroke(255,0,0);
      ellipse(this.tailtop.x, this.tailtop.y, 10, 10);

      y = constrain(this.pos.y + ((this.diam/2)  *  sin(90-(angle*1.2))), this.pos.y, this.pos.y + (this.diam/2));
      this.tailbottom = createVector(x, y);
      stroke(255,0,0);
      ellipse(this.tailbottom.x, this.tailbottom.y, 10, 10);

      noStroke();
      fill(255);
      quad( this.top.x, this.top.y, 
            this.tailtop.x, this.tailtop.y, 
            this.tailbottom.x, this.tailbottom.y, 
            this.bottom.x, this.bottom.y);
      noFill();

      
    } else {
      ellipse(this.pos.x, this.pos.y, this.diam, this.diam);
      this.pos.add(-.5  , 0);
      line(this.pos.x, this.pos.y, this.pos.x + (this.diam/2), this.pos.y);

      d = this.pos.dist(this.other.pos);
      overlap = this.diam-d;
      overlapdiff = (this.diam-overlap)/2;
      angle = (overlapdiff / (this.diam))*70;
      console.log(angle);
      
      x = this.pos.x + ((this.diam/2)  *  cos(angle-90));
      y = this.pos.y + ((this.diam/2)  *  sin(angle-90));

      this.top = createVector(x, y);
      ellipse(this.top.x, this.top.y, 10, 10);

      y = this.pos.y - ((this.diam/2)  *  sin(angle-90));
      this.bottom = this.top.copy();
      this.bottom.y = y;
      ellipse(this.bottom.x, this.bottom.y, 10, 10);

      // x = this.pos.x + ((this.diam/2)  *  cos(angle*1.2-90)) + (((this.diam/4)  *  cos(angle*1.2-90)));
      x = this.top.x + overlapdiff;
      x -= (x - this.top.x)/2;
      y = constrain(this.pos.y + ((this.diam/2)  *  sin((angle*1.2)-90)), this.pos.y - (this.diam/2), this.pos.y);
      
      this.tailtop = createVector(x, y);
      stroke(255,0,0);
      ellipse(this.tailtop.x, this.tailtop.y, 10, 10);

      y = constrain(this.pos.y + ((this.diam/2)  *  sin((angle*1.2)+90)), this.pos.y, this.pos.y + (this.diam/2));
      this.tailbottom = createVector(x, y);
      stroke(255,0,0);
      ellipse(this.tailbottom.x, this.tailbottom.y, 10, 10);

      noStroke();
      fill(255);
      quad( this.top.x, this.top.y, 
            this.tailtop.x, this.tailtop.y, 
            this.tailbottom.x, this.tailbottom.y, 
            this.bottom.x, this.bottom.y);
      noFill();

    }


    
    
  }
}