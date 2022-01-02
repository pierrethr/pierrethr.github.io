let w, h;
const nPoints = 24;
const angle = 360/nPoints;
let radius = 200;

const days = 10;

let center;
let points = new Array(days); 
let initPos = new Array(days);
let noiseoffset = 1;



// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  w = windowWidth;
  h = windowHeight;

  center = createVector(w/2, h/2);

  createCanvas(w, h);

  for (let d=0; d<days; d++) {
    points[d] = new Array(nPoints);
    initPos[d] = new Array(nPoints);

    for (let p=0; p<nPoints; p++) {
      let x = center.x + radius * cos(angle*p);
      let y = center.y + radius * sin(angle*p);
  
      points[d][p] = createVector(x, y);
      initPos[d][p] = createVector(x, y);
    }
  }
  
}


function draw() {
  background(0);
  noFill();
  stroke(255);
  strokeWeight(1);

  for (let d=0; d<points.length; d++) {
    for (let p=0; p<points[d].length; p++) {
      points[d][p] = initPos[d][p].copy().add(0, sin(frameCount/2)*random((d+1)*40));

      if (p < points[d].length-1)  line (points[d][p].x, points[d][p].y, points[d][p+1].x, points[d][p+1].y);
      else                         line (points[d][p].x, points[d][p].y, points[d][0].x, points[d][0].y);

      // let rp = Math.round(random(0, points[d].length));
      // let rp = p > (points[d].length/2) ? p - (points[d].length/2) : p + (points[d].length/2);

      // stroke(random(255), random(255), random(255));
      // if (points[d][rp] && p % 2 == 0)  line (points[d][p].x, points[d][p].y, points[d][rp].x, points[d][rp].y )
      // stroke(255);
    }
  }

}

