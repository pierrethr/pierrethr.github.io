let w, h;

const pSize = 30;
const pDrawSize = 10; // size of each pixel
let pattern;

let animDelay = 60;
let lastAnimTime = 0;

let origin;


// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  // ellipseMode(CORNER);
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL); 
  origin = createVector(-(w/2), -(h/2));

  // console.log(pattern.length);
  pattern = new Array(pSize);

  initPattern();
}

// --------------------------------------------
function initPattern() {
  for (let row=0; row<pattern.length; row++) {
    pattern[row] = new Array(pSize);

    for (let col=0; col<pSize; col++) {
      let c = Math.round(random(0, pSize));
      pattern[row][col] = c < 2 ? 1 : 0;
    }
  }
}


// --------------------------------------------
function draw() {
  if (millis() - lastAnimTime >= animDelay) animate();

  push();
    translate(0, -(pDrawSize*pSize)); // offsetting because origin of canvas in WEBGL renderer is the center of the window
    drawPattern();
  
    rotateY(-180);
    drawPattern();

    translate(0, (pDrawSize*pSize)*2  );
    rotateY(-180);
    rotateX(180);
    drawPattern();

    rotateY(-180);
    drawPattern();
  pop();
}

// --------------------------------------------
function drawPattern() {
  for (let row=0; row<pattern.length; row++) {
    for (let col=0; col<pattern[row].length; col++) {
      let x = col * pDrawSize;
      let y = row * pDrawSize;

      fill (255 * pattern[row][col]);
      rect(x, y, pDrawSize, pDrawSize);
    }
  }

  /*
  stroke(0,255,0);
  noFill()
  rect(0,0, pDrawSize*pSize, pDrawSize*pSize);
  noStroke();
  */
}

// --------------------------------------------
function animate() {
  for (let row=0; row<pattern.length; row++) {
    for (let col=0; col<pattern[row].length; col++) {
      if (row-1 >= 0 && col+1 < pSize) {
        pattern[row-1][col+1] = pattern[row][col];
        pattern[row][col] = 0;
      } 
      // pattern[row][col] = 0;
    }
  }

  let c;

  for (let row=0; row<pattern.length; row++) {
    c = Math.round(random(0, pSize));
    pattern[row][0] = c < 2 ? 1 : 0;
  }

  for (let col=0; col<pSize-1; col++) {
    c = Math.round(random(0, pSize));
    pattern[pSize-1][col] = c < 2 ? 1 : 0;
  }

  /*
  let sum = 0;
  for (let row=0; row<pattern.length; row++) {
    for (let col=0; col<pattern[row].length; col++) {
      sum += pattern[row][col];
    }
  }
  
  if (sum == 0) initPattern();
  */

  lastAnimTime = millis();
}