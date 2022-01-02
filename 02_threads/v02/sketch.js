let w, h;
const nPoints = 12;
const angle = 360/nPoints;
let radius = 200;

const days = 365;

let center;
let points = new Array(days); 
let noiseoffset = 1;



// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  w = displayWidth;
  h = displayHeight;

  center = createVector(w/2, h/2);

  createCanvas(w, h);

  for (let d=0; d<days; d++) {
    points[d] = new Array(nPoints);

    for (let p=0; p<nPoints; p++) {
      let x = center.x + radius * cos(angle*p);
      let y = center.y + radius * sin(angle*p);
  
      points[d][p] = createVector(x, y);
  
  
      noiseoffset += .1;
      let n = noise(noiseoffset);
      if (n < .5) points[d][p].add(n * 5);
      else        points[d][p].add(n * -5 );
    }

    radius+=2;
  }
  
  
  
}


function draw() {
  background(0);

  // fill(255);
  // noStroke();
  // ellipse(center.x, center.y, 2, 2);

  noFill();
  stroke(255,255,255,120);
  strokeWeight(.5);

  for (let d=0; d<points.length; d++) {
    // console.log(d + " , " + points[d].length);
    for (let p=0; p<points[d].length; p++) {
      points[d][p].add(random(-5, 5));

      if (p < points[d].length-1)  line (points[d][p].x, points[d][p].y, points[d][p+1].x, points[d][p+1].y);
      else                      line (points[d][p].x, points[d][p].y, points[d][0].x, points[d][0].y);
    }
  }

  /*
  for (let p=0; p<points.length; p++) {
    // ellipse(points[p].x, points[p].y, 20, 20);
    // console.log(noise(noiseoffset));

  
    // points[p].add(random(-5, 5));

    

  }
  */

}

