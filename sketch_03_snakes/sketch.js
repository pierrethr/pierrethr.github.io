let w, h;
let initx = 50;
let inity = 50;
const spacing = 70;
const nPoints = 10;

const moveDelay = 10;
let lastMove = 0;

let points = new Array(nPoints);
let snakes = new Array();

// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  w = displayWidth;
  h = displayHeight;

  createCanvas(w, h);
  createGrid();

  spawnSnake();
}

// ---------------------------------------
function createGrid() {
  let x = initx;
  let y = inity;

  for (let row=0; row<points.length; row++) {
    points[row] = new Array(nPoints);

    for (let col=0; col<points[row].length; col++) {
      points[row][col] = new Point(createVector(x, y), row, col);
      x += spacing;
    }

    x = initx;
    y += spacing;
  }  
}

// ---------------------------------------
function draw() {
  background(0);

  noStroke();
  fill(255);

  for (let row=0; row<points.length; row++) {
    for (let col=0; col<points[row].length; col++) {
      points[row][col].draw();
    }
  }  

  for (let s=0; s<snakes.length; s++) {
    snakes[s].draw();
  }

  if (millis() > (lastMove + moveDelay)) {
    moveSnakes();
  }
}

// ---------------------------------------
function moveSnakes() {
  for (let s=0; s<snakes.length; s++) {
    snakes[s].move();
  }

  lastMove = millis();
}

// ---------------------------------------
function spawnSnake() {
  snakes.push(new Snake(5, points[0][2]));
}

function setPointState(coords, state) {
  points[coords[0]][coords[1]].state = state;
}

// ---------------------------------------
class Point {
  state = 0;
  pos = 0;
  row = 0;
  col = 0;

  constructor (_pos, _row, _col) {
    this.pos = _pos;
    this.row = _row;
    this.col = _col;
    this.state = 0;
  }

  draw () {
    if (this.state != 2)  fill(255);
    else                  fill(0,0,255);

    if (this.state == 0) ellipse(this.pos.x, this.pos.y, 5, 5);
    else                ellipse(this.pos.x, this.pos.y, 10, 10);
  }

  isFree() {
    return this.state == 0 || this.state == 2;
  }
}



// ---------------------------------------
class Snake {
  size = 0;
  points = 0;

  constructor(_size, _initPoint) {
    this.size = _size;

    this.points = new Array();
    this.points.push(_initPoint);
    _initPoint.state = 1;

    // console.log("new snake " + this.points[0].state);
    this.move();
  }

  draw() {
    noFill();
    stroke(255);
    strokeWeight(2);

    for (let p=0; p<this.points.length-1; p++) {

      line (this.points[p].pos.x, this.points[p].pos.y, this.points[p+1].pos.x, this.points[p+1].pos.y);
    }
  }

  move() {
    let np = this.findNextPoint();
    np.state = 1;

    let s = this.points.unshift(np);
    if (s > this.size)  {
      this.points[s-1].state = 0;
      this.points.pop();
    }
    
  }

  findNextPoint() {
    let n, ne, nw, e, s, se, sw, w;
    let freePoints = new Array();

    let r, c;
    r = this.points[0].row > 0 ? this.points[0].row -1 : nPoints-1;
    n = new Array(r, this.points[0].col);

    c = this.points[0].col < nPoints-2 ? this.points[0].col+1 : 0;
    ne = new Array(r, c);

    e = new Array(this.points[0].row, c);

    c = this.points[0].col >  0 ? this.points[0].col-1 : nPoints-1;
    nw = new Array(r, c);

    w = new Array(this.points[0].row, c);

    r = this.points[0].row < nPoints-2 ? this.points[0].row+1 : 0;
    s = new Array(r, this.points[0].col);

    c = this.points[0].col < nPoints-2 ? this.points[0].col+1 : 0;
    se = new Array(r, c);

    c = this.points[0].col >  0 ? this.points[0].col-1 : nPoints-1;
    sw = new Array(r, c);

    // setPointState(n, 2);
    // setPointState(ne, 2);
    // setPointState(nw, 2);
    // setPointState(e, 2);
    // setPointState(s, 2);
    // setPointState(se, 2);
    // setPointState(sw, 2);
    // setPointState(w, 2);

    if (points[n[0]][n[1]].isFree())    freePoints.push(points[n[0]][n[1]]);
    if (points[ne[0]][ne[1]].isFree())  freePoints.push(points[ne[0]][ne[1]]);
    if (points[nw[0]][nw[1]].isFree())  freePoints.push(points[nw[0]][nw[1]]);
    if (points[e[0]][e[1]].isFree())    freePoints.push(points[e[0]][e[1]]);
    if (points[s[0]][s[1]].isFree())    freePoints.push(points[s[0]][s[1]]);
    if (points[se[0]][se[1]].isFree())  freePoints.push(points[se[0]][se[1]]);
    if (points[sw[0]][sw[1]].isFree())  freePoints.push(points[sw[0]][sw[1]]);
    
    console.log(freePoints.length + " free points");
    
    let i = Math.floor(random(0,freePoints.length));

    freePoints[i].state = 2;
    return freePoints[i];

  }
}
