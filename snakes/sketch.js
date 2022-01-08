let w, h;
let initx = 50;
let inity = 50;
const spacing = 20;
const nPoints = 40;

const moveDelay = 50;
let lastMove = 0;

const spawnDelay = 1000;
let lastSpawn = 0;

let points = new Array(nPoints);
let snakes = new Array();
let snakesCount = -1;

const onRadius = 100;
const offRadius = 5;
const snakeSize = 10;
const maxSnakes = 20;

const drawSnake = false;
const drawGrid = true;

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


  for (let row=0; row<points.length; row++) {
    for (let col=0; col<points[row].length; col++) {
      points[row][col].draw();
    }
  }  

  for (let s=0; s<snakes.length; s++) {
    snakes[s].draw();
  }

  if (millis() > (lastSpawn + spawnDelay))  spawnSnake();
  if (millis() > (lastMove + moveDelay))    moveSnakes();
  
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
  if (snakes.length >= maxSnakes) return;

  snakes.push(new Snake(snakesCount+=1, snakeSize, findSpawnPoint()));
  lastSpawn = millis();
}


function setPointState(coords, state) {
  points[coords[0]][coords[1]].state = state;
}

function findSpawnPoint() {
  let freePoints = new Array();

  let row = 0;
  let col = 0;
  for (col=0; col<points[row].length; col++) {
    if (points[row][col].isFree()) freePoints.push(points[row][col]);
  }

  row = points.length-1;
  for (col=0; col<points[row].length; col++) {
    if (points[row][col].isFree()) freePoints.push(points[row][col]);
  }

  let i = Math.floor(random(0,freePoints.length));
  return freePoints[i];
}

// ===============================================================
class Point {
  state = 0;
  pos = 0;
  row = 0;
  col = 0;

  // ---------------------------------------
  constructor (_pos, _row, _col) {
    this.pos = _pos;
    this.row = _row;
    this.col = _col;
    this.state = 0;
  }

  // ---------------------------------------
  draw () {

    noStroke();
    // stroke(0);
  
    if (this.state != 2)  fill(255);
    else                  fill(0,0,255);

    if (this.state == 0 && drawGrid)  ellipse(this.pos.x, this.pos.y, offRadius, offRadius);
    else if (this.state == 1)         ellipse(this.pos.x, this.pos.y, onRadius, onRadius);
  }

  // ---------------------------------------
  isFree() {
    return this.state == 0 || this.state == 2;
  }
}



// ===============================================================
class Snake {
  id = -1;
  size = 0;
  points = new Array();
  justWrapped = false;

  // ---------------------------------------
  constructor(_id, _size, _spawnPoint) {
    this.id = _id;
    this.size = _size;

    this.points.push(_spawnPoint);
    _spawnPoint.state = 1;

    this.justWrapped = false;

    // console.log("new snake " + this.points[0].state);
    this.move();
  }

  // ---------------------------------------
  draw() {
    if (!drawSnake) return;

    noFill();
    stroke(255);
    strokeWeight(2);

    for (let p=0; p<this.points.length-1; p++) {
      if (this.points[p].pos.dist(this.points[p+1].pos) < spacing*2)  line (this.points[p].pos.x, this.points[p].pos.y, this.points[p+1].pos.x, this.points[p+1].pos.y);
      
    }
  }

  // ---------------------------------------
  move() {
    let np = this.findNextPoint();
    if (np == undefined)  {
      this.remove();
      return;
    }

    np.state = 1;

    let s = this.points.unshift(np);
    if (s > this.size)  {
      this.points[s-1].state = 0;
      this.points.pop();
    }

    if (this.points.length >= 2)  this.justWrapped = this.points[0].pos.dist(this.points[1].pos) > spacing*2;
    
  }

  // ---------------------------------------
  findNextPoint() {
    let n, ne, nw, e, s, se, sw, w;
    let freePoints = new Array();

    let r, c;
    r = this.points[0].row > 0 ? this.points[0].row -1 : nPoints-1;
    n = new Array(r, this.points[0].col);

    c = this.points[0].col < nPoints-1 ? this.points[0].col+1 : 0;
    ne = new Array(r, c);

    e = new Array(this.points[0].row, c);

    c = this.points[0].col >  0 ? this.points[0].col-1 : nPoints-1;
    nw = new Array(r, c);

    w = new Array(this.points[0].row, c);

    r = this.points[0].row < nPoints-1 ? this.points[0].row+1 : 0;
    s = new Array(r, this.points[0].col);

    c = this.points[0].col < nPoints-1 ? this.points[0].col+1 : 0;
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

    let direction = -1;
    if (this.points.length >= 2 && !this.justWrapped) {
      direction = createVector(this.points[0].pos.x - this.points[1].pos.x, this.points[0].pos.y - this.points[1].pos.y);
      direction = atan2(direction.x, direction.y);

      let heading = "";
    
      if (direction == 90)          heading = "E";
      else if (direction == 180)    heading = "N";
      else if (direction == 135)    heading = "NE";
      else if (direction == -90)   heading = "W";
      else if (direction == -135)   heading = "NW";
      else if (direction == 0)      heading = "S";
      else if (direction == 45)     heading = "SE";
      else if (direction == -45)    heading = "SW";

      // console.log(direction);
      // console.log(heading);

      if (heading.indexOf("N") != -1) {
        if (points[n[0]][n[1]].isFree())    freePoints.push(points[n[0]][n[1]]);
        if (points[ne[0]][ne[1]].isFree())  freePoints.push(points[ne[0]][ne[1]]);
        if (points[nw[0]][nw[1]].isFree())  freePoints.push(points[nw[0]][nw[1]]);
      }

      if (heading.indexOf("S") != -1) {
        if (points[s[0]][s[1]].isFree())    freePoints.push(points[s[0]][s[1]]);
        if (points[se[0]][se[1]].isFree())  freePoints.push(points[se[0]][se[1]]);
        if (points[sw[0]][sw[1]].isFree())  freePoints.push(points[sw[0]][sw[1]]);
      }

      if (heading.indexOf("E") != -1) {
        if (points[e[0]][e[1]].isFree())    freePoints.push(points[e[0]][e[1]]);
        if (heading.indexOf("N") == -1) {
          if (points[n[0]][n[1]].isFree())    freePoints.push(points[n[0]][n[1]]);
          if (points[ne[0]][ne[1]].isFree())  freePoints.push(points[ne[0]][ne[1]]);
        }

        if (heading.indexOf("S") == -1) {
          if (points[s[0]][s[1]].isFree())    freePoints.push(points[s[0]][s[1]]);
          if (points[se[0]][se[1]].isFree())  freePoints.push(points[se[0]][se[1]]);
        }
      }

      if (heading.indexOf("W") != -1) {
        if (points[w[0]][w[1]].isFree())    freePoints.push(points[w[0]][w[1]]);

        if (heading.indexOf("N") == -1) {
          if (points[n[0]][n[1]].isFree())    freePoints.push(points[n[0]][n[1]]);
          if (points[nw[0]][nw[1]].isFree())  freePoints.push(points[nw[0]][nw[1]]);
        }

        if (heading.indexOf("S") == -1) {
          if (points[s[0]][s[1]].isFree())    freePoints.push(points[s[0]][s[1]]);
          if (points[sw[0]][sw[1]].isFree())  freePoints.push(points[sw[0]][sw[1]]);
        }
      }
    } else {
      if (points[n[0]][n[1]].isFree())    freePoints.push(points[n[0]][n[1]]);
      if (points[ne[0]][ne[1]].isFree())  freePoints.push(points[ne[0]][ne[1]]);
      if (points[nw[0]][nw[1]].isFree())  freePoints.push(points[nw[0]][nw[1]]);
      if (points[s[0]][s[1]].isFree())    freePoints.push(points[s[0]][s[1]]);
      if (points[se[0]][se[1]].isFree())  freePoints.push(points[se[0]][se[1]]);
      if (points[sw[0]][sw[1]].isFree())  freePoints.push(points[sw[0]][sw[1]]);
      if (points[e[0]][e[1]].isFree())    freePoints.push(points[e[0]][e[1]]);
      if (points[w[0]][w[1]].isFree())    freePoints.push(points[w[0]][w[1]]);
    }

    // console.log(freePoints.length + " free points");
    
    let i = Math.floor(random(0,freePoints.length));

    if (freePoints[i] != undefined) freePoints[i].state = 2;
    return freePoints[i];

  }

  remove() {
    for (let p=0; p<this.points.length; p++) {
      this.points[p].state = 0;
    }

    for (let s=0; s<snakes.length; s++) {
      if (snakes[s].id == this.id)  snakes.splice(s,1);
    }
    // console.log("kill me " + this.id);
    delete this;

  }
}
