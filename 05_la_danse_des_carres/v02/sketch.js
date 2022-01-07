let w, h;

const gridSize = 6;
const gridW = 500;
const scale = 500;

const drawPoints = false;
const drawLines = false;
const useColor = true;

let points = new Array();

let rOffset = 0.0;
let gOffset = 0.0;
let bOffset = 0.0;

let brightest = 0;
let inc = 0;
let direction = 1;


// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  ellipseMode(CORNER);

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

  let diff;

  for (let row=0; row<gridSize; row++) {
    for (let col=0; col<gridSize; col++) {
      points[row][col].draw();
      if (col < gridSize-1 && row < gridSize -1) {
        diff = p5.Vector.sub(points[row][col].pos, points[row+1][col+1].pos);

        if (useColor) {
          rOffset += .1;
          gOffset += .2;
          bOffset += .3;

          fill(noise(rOffset*255)*255, noise(gOffset*255)*255, noise(bOffset*255)*255);
        } else {

          // fade
          // inc += .0001 * direction;
          // brightest = lerp(0, gridSize*gridSize, inc);

          // if (brightest > gridSize || brightest <= 0) direction *= -1;
          
          // fill((abs(row-brightest)/gridSize)*255);
          fill(255);
          
          console.log(brightest);
        }
        
        ellipse(points[row][col].pos.x*scale, points[row][col].pos.y*scale, diff.x*scale, diff.y*scale);
      }
    }
  }

  pop();
}

// --------------------------------------------
function launchAnim() {
  let r = Math.floor(random(1, gridSize-2));
  let c = Math.floor(random(1, gridSize-2));
  let x = points[r][c].pos.x + random(.1, .99 - points[r][c].pos.x);
  let y = points[r][c].pos.y + random(.1, .99 - points[r][c].pos.y);
  let speed = random(10,35);

  points[r][c].startAnim(createVector(x, y), speed, false);
}

function resetAnim(_point) {
  _point.startAnim(_point.initPos, random(10,35), true);
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
      points[r][this.col].pos.x = points[r][this.col].pos.x > 1 ? .99 : points[r][this.col].pos.x;

      for (let c=this.col+1; c<gridSize; c++) {
        if(points[r][c] != this) points[r][c].pos.x = constrain(points[r][c-1].pos.x + eachx, 0, 1);
      }
    }

    for (let r=0; r<gridSize; r++) {
      for (let c=0; c<gridSize; c++) {
        if (points[r][c].row == this.row) {
          if (points[r][c] != this) points[r][c].pos.add(0, ymove);
          points[r][c].pos.y = points[r][c].pos.y > 1 ? .99 : points[r][c].pos.y;
        } else {
          if (r > 0)  constrain(points[r][c].pos.y = points[r-1][c].pos.y + eachy, 0, 1);
          
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