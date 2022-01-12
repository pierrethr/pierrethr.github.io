let w, h;

const frameW = 400;
const frameH = 800;

let spacing = 10;

const cols = 10;
const rows = 20;

const sW = ((frameW - (cols*spacing))/cols);
const sH = ((frameH - (rows*spacing))/rows);

// max amount of random x/y displacement of each corner
let rX = 3;
let rY = 3;

let lerpInc = 0;
let currentSquare = 0;
let currentPoint = 0;
let framesPerLine = 1;
let animDone = false;

let squares = new Array();
let drawQuad = new Array();

let originalSquares = new Array();
let brokenSquares = new Array();

// -----

let lerpIncBreak = 0;
let breakDir = true;

// ----------------------------------------------------------------------
function setup() {
  angleMode(DEGREES);

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);

  noFill();

  createSquares();
  
}

// ----------------------------------------------------------------------
function createSquares() {
  let tl, tr, br, bl;

  for (let r=0; r<rows; r++) {
    rX = rY = (r*1.5);

    for (let c=0; c<cols; c++) {
      let tmp = new Array(4);
      tl = createVector((c*sW)+(c*spacing), (r*sH)+(r*spacing));
      tr = tl.copy().add(sW, 0);
      br = tr.copy().add(0, sH);
      bl = br.copy().add(-sW, 0);

      tl.add(random(-rX, rX), random(-rY, rY));
      tr.add(random(-rX, rX), random(-rY, rY));
      br.add(random(-rX, rX), random(-rY, rY));
      bl.add(random(-rX, rX), random(-rY, rY));

      tmp[0] = tl;
      tmp[1] = tr;
      tmp[2] = br;
      tmp[3] = bl;

      squares.push(tmp);
      drawQuad.push(random(0,1) < .2);
    }
  }

  

  // copy all vectors into original squares
  for (let sq=0; sq<squares.length; sq++) {
    let tmpOg = new Array();

    for (let pt=0; pt<squares[sq].length; pt++) {
      tmpOg.push(squares[sq][pt].copy());
    }
    originalSquares.push(tmpOg);
  }

  createBrokenSquares();

}

// ----------------------------------------------------------------------
function draw() {
  clear();
  stroke(255);

  push();
  translate((w/2) - (frameW/2), (h/2) - (frameH/2));

  // animBreakSquares();

  animDone = (currentSquare == ((rows*cols)-1));

  if (!animDone) {
    if (lerpInc < 1) {
      lerpInc += 1/framesPerLine;

      let cP = squares[currentSquare][currentPoint];
      let nP = getNextPoint(currentSquare, currentPoint);

      let end = p5.Vector.lerp(cP, nP, lerpInc);

      line(cP.x, cP.y, end.x, end.y);

    } else {
      lerpInc = 0;

      if (currentPoint == 3) {
        currentPoint = 0;
        if (currentSquare < squares.length-1) currentSquare++;
      } else {
        currentPoint++;
      }
    }

    drawSquaresFromStartTo(currentSquare, currentPoint);
  } else {
    drawSquaresFromStartTo((cols*rows)-1, 3);
  }
  pop();
}

// ----------------------------------------------------------------------
function drawSquaresFromStartTo(_square, _pt) {
  for (let sq=0; sq<_square; sq++) {
    for (let pt=0; pt<squares[sq].length-1; pt++) {
      line (squares[sq][pt].x, squares[sq][pt].y, getNextPoint(sq, pt).x, getNextPoint(sq, pt).y);
    }
    line (squares[sq][3].x, squares[sq][3].y, getNextPoint(sq, 3).x, getNextPoint(sq, 3).y);
    
    if (sq<_square)  line (squares[sq][0].x, squares[sq][0].y, squares[sq+1][0].x, squares[sq+1][0].y);

    /*
    if (drawQuad[sq]) {
      fill(255);
      quad(squares[sq][0].x, squares[sq][1].y, squares[sq][1].x, squares[sq][1].y, squares[sq][2].x, squares[sq][2].y, squares[sq][3].x, squares[sq][3].y)
      noFill();
    }
    */

  }
  
  for (let pt=0; pt<_pt; pt++) {
    line (squares[_square][pt].x, squares[_square][pt].y, getNextPoint(_square, pt).x, getNextPoint(_square, pt).y);
  }
  
}

// ----------------------------------------------------------------------
function getNextPoint(_square, _pt) {
  if (_pt < 3) {
    return squares[_square][_pt+1];
  } else {
    if (_pt == 3) return squares[_square][0];
    else          return squares[_square+1][0];
  }
}

// ----------------------------------------------------------------------
function animBreakSquares() {
  if (lerpIncBreak < 1) {
    lerpIncBreak += .02;
  } else {
    lerpIncBreak = 0;
    breakDir = !breakDir;
    if (breakDir) createBrokenSquares();
    
  }
  console.log(breakDir);

  for (let sq=0; sq<squares.length; sq++) {
    for (let pt=0; pt<squares[sq].length; pt++) {
      if (breakDir)   squares[sq][pt] = p5.Vector.lerp(originalSquares[sq][pt], brokenSquares[sq][pt],  lerpIncBreak);
      else            squares[sq][pt] = p5.Vector.lerp(brokenSquares[sq][pt],   originalSquares[sq][pt], lerpIncBreak);
    }
  }
}


// ----------------------------------------------------------------------
function createBrokenSquares() {
  brokenSquares = new Array();
  // copy all vectors
  for (let sq=0; sq<originalSquares.length; sq++) {
    let tmpBk = new Array();

    for (let pt=0; pt<originalSquares[sq].length; pt++) {
      tmpBk.push(createVector(originalSquares[sq][pt].x, originalSquares[sq][pt].y));
    }
    brokenSquares.push(tmpBk);
  }

  // randomize vectors of broken squares
  let rndAmount = 0;
  for (let sq=0; sq<brokenSquares.length; sq++) {
    
    for (let pt=0; pt<brokenSquares[sq].length; pt++) {
      rndAmount = random(0, 30);
      if (pt == 0)        brokenSquares[sq][pt].add(-rndAmount, -rndAmount);
      else if (pt == 1)   brokenSquares[sq][pt].add(rndAmount, -rndAmount);
      else if (pt == 2)   brokenSquares[sq][pt].add(rndAmount, rndAmount);
      else if (pt == 3)   brokenSquares[sq][pt].add(-rndAmount, rndAmount);
    }
  }
}