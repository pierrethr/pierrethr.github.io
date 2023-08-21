let w, h;

let roots = new Array();



// ----------------------------------------------------------------------
function setup() {
  angleMode(DEGREES);

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL);

  roots.push (new Root(roots.length, createVector(-400, 0), createVector(1, 0), 10));
  
}

function draw() {
  clear();
  stroke(255);
  noFill();

  for (let r = 0; r < roots.length; r++) {
    roots[r].draw();
  }
}

function spawnNewRoot(_lastPos) {
  console.log("NEW ROOT " + _lastPos);

  roots.push(new Root(roots.length, createVector(_lastPos.x, _lastPos.y), createVector(1, 1), 10));
  roots.push(new Root(roots.length, createVector(_lastPos.x, _lastPos.y), createVector(1, -1), 10));

}

class Root {
  id = 0;
  startPos = 0;
  endPos = 0;
  length = 0;
  inc = 0;
  done = false;
  dir = 0;

  constructor(_id, _start, _dir, _length) {
    // console.log("ROOT " + _id);
    this.id = _id;
    this.startPos = _start;
    this.dir = _dir;
    this.endPos = createVector(this.startPos.x, this.startPos.y);
    this.length = _length;

    this.inc = 0;
    this.done = false;
  }

  draw() {
    let l = this.startPos.distance(this.endPos);
    if (l < this.length) {
      this.endPos.add(this.dir);
    } else if (l >= this.length && !this.done) {
      this.done = true;
      spawnNewRoot(this.endPos);
    }



    // if (this.inc < 1) {
    //   this.inc += .1;
    //   // this.endPos.add(this.inc);
    //   this.endPos.add(this.dir);
    // } else if (this.inc >= 1 && !this.done) {
    //   this.done = true;
    //   spawnNewRoot(this.endPos);
    // }

    line (this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y);
    
  }
}