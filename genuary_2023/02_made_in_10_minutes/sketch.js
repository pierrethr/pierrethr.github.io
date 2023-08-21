let w, h;
let pts = new Array();

let spawnEveryMs = 100;
let lastSpawn = 0;

let angle = 0;

function setup() {
  angleMode(DEGREES);
  rectMode(RADIUS);

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL);
}

function spawnPoint() {
  if (pts.length >= 500) return
  pts.push(createVector(random(-200,200), random(-400,400), random(-300,300)))
  lastSpawn = millis();
}


function draw() {
  clear();
  // noStroke();
  // noFill()
  // stroke(255)

  beginShape(TESS);


  angle += .1
  rotateY(angle);
  // rotateZ(angle/10);

  if (millis() - lastSpawn >= spawnEveryMs) spawnPoint()

  for (let p=0; p<pts.length; p++) {
    vertex(pts[p].x, pts[p].y, pts[p].z)
    // ellipse(pts[p].x, pts[p].y, 10, 10)
  }

  endShape();

}

