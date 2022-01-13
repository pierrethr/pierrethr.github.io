let w, h;

let vertices = new Array();

let angle = 0;
let sub = new Array();

const subDelay = 200;
let lastSubTime = 0;
let nSubs = 0;

// ----------------------------------------------------------------------
function setup() {
  angleMode(DEGREES);

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL);

  // front
  vertices.push(createVector(-1, -1, 1));
  vertices.push(createVector(1, -1, 1));
  vertices.push(createVector(-1, 1, 1));

  vertices.push(createVector(1, 1, 1));
  vertices.push(createVector(-1, 1, 1));
  vertices.push(createVector(1, -1, 1));

  // left
  vertices.push(createVector(-1, -1, -1));
  vertices.push(createVector(-1, -1, 1));
  vertices.push(createVector(-1, 1, -1));

  vertices.push(createVector(-1, 1, 1));
  vertices.push(createVector(-1, 1, -1));
  vertices.push(createVector(-1, -1, 1));

  // back
  vertices.push(createVector(1, -1, -1));
  vertices.push(createVector(-1, -1, -1));
  vertices.push(createVector(1, 1, -1));

  vertices.push(createVector(-1, 1, -1));
  vertices.push(createVector(1, 1, -1));
  vertices.push(createVector(-1, -1, -1));

  // right
  vertices.push(createVector(1, -1, 1));
  vertices.push(createVector(1, -1, -1));
  vertices.push(createVector(1, 1, 1));

  
  vertices.push(createVector(1, 1, -1));
  vertices.push(createVector(1, 1, 1));
  vertices.push(createVector(1, -1, -1));

  // top
  vertices.push(createVector(-1, -1, 1));
  vertices.push(createVector(-1, -1, -1));
  vertices.push(createVector(1, -1, 1));

  
  vertices.push(createVector(1, -1, -1));
  vertices.push(createVector(1, -1, 1));
  vertices.push(createVector(-1, -1, -1));

  // bottom
  
  vertices.push(createVector(-1, 1, -1));
  vertices.push(createVector(1, 1, -1));
  vertices.push(createVector(-1, 1, 1));

  vertices.push(createVector(1, 1, 1));
  vertices.push(createVector(1, 1, -1));
  vertices.push(createVector(-1, 1, 1));
  
}

function subdivide(_start) {
  sub = new Array();
  let rndAmt = nSubs/10;
  let rndX, rndY, rndZ;

  sub.push (vertices[_start].copy());
  sub.push (vertices[_start+1].copy());
  sub.push(vertices[_start+1].copy().add(vertices[_start+2]).div(2)); //midpoint
  rndX = random(0, rndAmt/2);
  rndY = random(0, rndAmt/2);
  rndZ = random(0, rndAmt*2);
  sub[sub.length-1].add (rndX, rndY, rndZ);

  sub.push (vertices[_start].copy());
  sub.push (vertices[_start+2].copy());
  sub.push(vertices[_start+2].copy().add(vertices[_start+1]).div(2)); //midpoint
  sub[sub.length-1].add (rndX, rndY, rndZ);

  sub.push (vertices[_start+3].copy());
  sub.push (vertices[_start+4].copy());
  sub.push(vertices[_start+4].copy().add(vertices[_start+5]).div(2)); //midpoint
  sub[sub.length-1].add (rndX, rndY, rndZ);

  sub.push (vertices[_start+3].copy());
  sub.push (vertices[_start+5].copy());
  sub.push(vertices[_start+5].copy().add(vertices[_start+4]).div(2)); //midpoint
  sub[sub.length-1].add (rndX, rndY, rndZ);

  //update cube
  vertices[_start] = sub[0];
  vertices[_start+1] = sub[1];
  vertices[_start+2] = sub[2];

  vertices[_start+3] = sub[6];
  vertices[_start+4] = sub[7];
  vertices[_start+5] = sub[8];

  vertices.splice(3, 0, sub[3]);
  vertices.splice(4, 0, sub[4]);
  vertices.splice(5, 0, sub[5]);

  vertices.splice(6, 0, sub[9]);
  vertices.splice(7, 0, sub[10]);
  vertices.splice(8, 0, sub[11]);


  lastSubTime = millis();
  nSubs++;
  if (nSubs == 20) nSubs = 0;
}

function draw() {
  clear();

  // if (millis() - lastSubTime >= subDelay) subdivide(nSubs);

  angle = frameCount%360;
  console.log(angle);

  if (angle == 180) subdivide(nSubs);
  // console.log(angle);
  // noFill();
  fill(0);
  stroke(255);
  rotateX(angle);
  scale(100);


  
  // beginShape(TRIANGLE_STRIP);
  beginShape(TRIANGLES);

  for (let v=0; v<vertices.length; v++) {
    // strokeWeight(random(1, 60));
    // strokeWeight(sin(frameCount/2)*v);
    // vertices[v].add(random(-.01, .01), random(-.01, .01), random(-.01, .01));
    // vertices[v].add(random(.01, .02), random(.01, .02), random(.01, .02));
    vertex(vertices[v].x, vertices[v].y, vertices[v].z);
  }

  

  endShape(CLOSE);
  


  // beginShape(TRIANGLES);
  // stroke(255,0,0);
  // for (let v=0; v<sub.length; v++) {
  //   vertex(sub[v].x, sub[v].y, sub[v].z);
  // }

  // endShape(CLOSE);
}