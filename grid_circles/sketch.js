let w, h;
let circles = new Array();

let nCirclesLine = 21;

function setup() {
  angleMode(DEGREES);

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);

  noFill();
  spawnCircles();
  
}

function spawnCircles() {
  let diam = w / nCirclesLine;

  for (let r = 0; r < nCirclesLine; r++) {
    for (let c = 0; c < nCirclesLine; c++) {
      let x = c * diam;
      let y = r * diam;

      let circle = new Circle(circles.length, x, y, diam+10, (c/nCirclesLine)*500, 1);
      circles.push(circle);
    }
  }
}

function draw() {
  clear();
  stroke(255);

  for (let c=0; c<circles.length; c++) {
    circles[c].draw();
  }
}


class Circle extends p5.Vector {
  id = 0;
  diam = 0;
  drawPoint = 0;
  dir = 2;
  dirScale = 1;
  offset = 0;
  

  constructor(_id, _x, _y, _diam, _offset, _dirScale) {
    super(_x, _y, 0);

    this.id = _id;
    this.x = _x;
    this.y = _y;

    this.diam = _diam;
    this.offset = _offset;
    this.dirScale = _dirScale;
    this.drawPoint = createVector(this.x, this.y);

    this.dir = (this.id % 2 == 0) ? 2 : -2;
    this.dir *= this.dirScale;
  }

  draw () {
    let distFromCenterX = 1 - Math.abs((this.x - (w/2)) / (w/2));

    let distFromCenterY = Math.abs((this.y - (h/2)) / (h/2));
    distFromCenterY *= cos(millis()-(distFromCenterX*300));

    // this.drawPoint.set(this.x + (this.amplitude * cos(this.ampAngle)), this.y + (this.amplitude * sin(this.ampAngle)));
    // this.drawPoint.set(this.x, this.y);

    this.drawPoint.set(this.x + (cos(millis()-this.offset)*this.dir), this.y + (sin(millis()-this.offset)*this.dir));
    
    // stroke(distFromCenterY * 255);
    ellipse(this.drawPoint.x, this.drawPoint.y, this.diam, this.diam);
    
    // line(this.x, this.y, w/2, h/2);
  }

}vdnlb2018