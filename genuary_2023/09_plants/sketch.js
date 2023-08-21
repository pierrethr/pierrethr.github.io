let w, h;
let pts = new Array();

let clearEveryMs = 1000;
let lastClear = 0;

let angle = 0;

let R = (a=1)=>Math.random()*a;
let L = (x,y)=>(x*x+y*y)**0.5;

function setup() {

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL);
}

// From Paul Bourke http://paulbourke.net/geometry/supershape/
function Eval(m, n1, n2, n3, phi)
{
   let r;
   let t1,t2;
   let a=1,b=1;

   t1 = cos(m * phi / 4) / a;
   t1 = abs(t1);
   t1 = pow(t1,n2);

   t2 = sin(m * phi / 4) / b;
   t2 = abs(t2);
   t2 = pow(t2,n3);

   r = pow(t1+t2,1/n1);
   if (abs(r) == 0) {
      x = 0;
      y = 0;
   } else {
      r = 1 / r;
      x = r * cos(phi);
      y = r * sin(phi);
   }

   return createVector(x, y);
}

function draw() {
  clear()
  noStroke()
  fill(0,255,0)

  let m = ((mouseX/w)*10)+1
  // let m = 1
  let n1 = .5
  let n2 = .5
  let n3 = .5
  let NP = abs(cos(millis()/2000))*200

  let NLEAVES = 11


  for (let k=0; k<NLEAVES; k++) {
    rotateZ(20)
    for (let i=0;i<=NP;i++) {
      let phi = i * TWO_PI / NP;
      let pt = Eval(m,n1,n2,n3,phi);
      
      // pt.add(createVector(w/2, h/2))
      pt.mult(200);
  
      circle(pt.x+((sin(millis()/2000))*200), pt.y , 2)
   }
  }

  stroke(0,255,0)
  strokeWeight(1)

  rotateZ(-.09)
  line (0, 0, 0, h)
  
  

}