let w, h;

const gridSize = 6;
const gridW = 500;
const scale = 500;

const drawPoints = false;
const drawLines = true;

let points = new Array();


// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);

  // create points
  for (let row=0; row<gridSize; row++) {
    points.push(new Array(gridSize));
    for (let col=0; col<gridSize; col++) {
      points[row][col] = new Point(createVector(col/gridSize, row/gridSize), row, col);
    }
  }

  launchAnim();
}

// --------------------------------------------
function draw() {
  clear();
  push();
  translate((w/2)-(scale/2),(h/2)-(scale/2));

  if (drawLines) {
    stroke(255);
    for (let row=0; row<gridSize; row++) {
      for (let col=0; col<gridSize-1; col++) {
        line(points[row][col].pos.x*scale, points[row][col].pos.y*scale,  points[row][col+1].pos.x*scale, points[row][col+1].pos.y*scale);
      }

      if (row < gridSize-1) {
        for (let col=0; col<gridSize; col++) {
          line(points[row][col].pos.x*scale, points[row][col].pos.y*scale,  points[row+1][col].pos.x*scale, points[row+1][col].pos.y*scale);
        }
      }
    }
  }

  noStroke();
  fill(255);

  for (let row=0; row<gridSize; row++) {
    for (let col=0; col<gridSize; col++) {
      points[row][col].draw();
    }
  }

  pop();
}

// --------------------------------------------
function launchAnim() {
  let r = Math.floor(random(1, gridSize-2));
  let c = Math.floor(random(1, gridSize-2));
  let x = points[r][c].pos.x + random(.1, .5);
  let y = points[r][c].pos.y + random(.1, .5);
  let speed = random(5,10);

  points[r][c].startAnim(createVector(x, y), speed, false);
}

function resetAnim(_point) {
  _point.startAnim(_point.initPos, random(5,10), true);
}

// ============================================================
class Point {
  pos = 0;
  anim = false;
  row = null;
  col = null;

  initPos = null;
  animTargetPos = null;
  animSpeed = null;
  animStartPos = null;
  reset = null;

  constructor(_pos, _row, _col) {
    this.pos = _pos;
    this.row = _row;
    this.col = _col;
    this.initPos = _pos.copy();
  }


  draw() {
    if (this.anim) this.updateAnim();
    if (!drawPoints)  return;

    if (this.anim)  fill(0,0,255);
    ellipse(this.pos.x * scale, this.pos.y * scale, 10, 10);
    fill(255);
  }

  startAnim(_targetPos, _speed, _reset) {
    this.anim = true;

    if (_reset) {
      this.animTargetPos = this.initPos.copy();
      _speed *= -1;
    } else {
      this.animTargetPos = _targetPos;
    }        

    this.animSpeed = _speed;
    this.animStartPos = this.pos;
    this.reset = _reset;

  }

  updateAnim() {
    let xmove = .001 * this.animSpeed;
    let ymove = .001 * this.animSpeed;
    // console.log(xmove);
    this.pos.add(xmove, ymove);

    let leftx = 1-this.pos.x;
    let nx = (gridSize-1) - (this.col);
    let eachx = leftx / nx;

    let lefty = 1-this.pos.y;
    let ny = (gridSize-1) - (this.row);
    let eachy = lefty / ny;

    
    for (let r=0; r<gridSize; r++) {
      if (points[r][this.col] != this)  points[r][this.col].pos.add(xmove, 0);

      for (let c=this.col+1; c<gridSize; c++) {
        if(points[r][c] != this) points[r][c].pos.x = points[r][c-1].pos.x + eachx;
      }
    }

    for (let r=0; r<gridSize; r++) {
      for (let c=0; c<gridSize; c++) {
        if (points[r][c].row == this.row) {
          if (points[r][c] != this) points[r][c].pos.add(0, ymove);
        } else {
          if (r > 0)  points[r][c].pos.y = points[r-1][c].pos.y + eachy;
          
        }
      }
    }

    if (this.reset) {
      if (this.pos.x <= this.initPos.x || this.pos.y <= this.initPos.y)       {
        this.anim = false;
        launchAnim();
        return;
      }
    } else {
      if (this.pos.x >= this.animTargetPos.x || this.pos.y >= this.animTargetPos.y)       {
        this.anim = false;
        resetAnim(this);
        return;
      }
    }

  }
}