let w, h;
let pts = new Array();

let clearEveryMs = 1000;
let lastClear = 0;

let angle = 0;

let R = (a=1)=>Math.random()*a;
let L = (x,y)=>(x*x+y*y)**0.5;

function setup() {
  angleMode(DEGREES);
  rectMode(RADIUS);

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL);
}

function sdfCircle([x, y]) {
  return L(x, y) - .3;
}

function sdTorus( p, t )
{
  // console.log(p.x)
  let q = p5.Vector.mag(p5.Vector.mag([p.x, p.z])-t.x,p.y);
  return p5.Vector.mag(q)-t.y;
  // return (1)
}

function sdSphere(p, s )
{
  return p5.Vector.mag(p)-(s*((mouseY/h)*2));
}

function sdBox(p, b)
{
  let q = createVector(abs(p.x), abs(p.y), abs(p.z)).sub(b);
  let v = max(q.x,0.0)
  return p5.Vector.mag(createVector(v, v, v))+ min(max(q.x,max(q.y,q.z)),0.0);
  
  // return q
  // return p5.Vector.mag(max(q.x,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}



function draw() {
  
noStroke();
if (millis() - lastClear >= clearEveryMs) {
  lastClear = millis()
  clear()
}


  clear();
  // for (let k = 0; k < 1000; k++) {
  //   let p = [R(2)-1, R(2)-1]
  //   let d = sdfCircle(p)
  //   let c = color(0)
    
  //   console.log(d)

  //   if (d < -.01)   c = color(255,0,0)
  //   if (d > .01)   c = color(0,255,0)
  //   noStroke();
  //   fill (c)

  //   circle(p[0]*(width/2), p[1]*(height/2), 2);
    
  // }


  
  let col = color(0)
  let p

  rotateX(((millis() % 8000)/8000)*360)
  rotateY(((millis() % 8000)/8000)*360)
  for (let x = -250; x < 250; x+=10) {
    for (let y = -250; y < 250; y+=10) {
    let p = createVector(x, y, random(-(mouseX/w)*200, (mouseX/w)*200))
    // let p = createVector(x, y, x*2)

    let intensity = (1-(abs(p.z)/250))

    if (sdSphere(p, 250) < -.01)  col = color(intensity*255,0,0)
    if (sdSphere(p, 250) > .01)    col = color(0,0,0)

    fill(col)
    
    push()
    translate(p.x, p.y, p.z)
    sphere(2);
    pop();

    if (sdSphere(p, 250) < -.01)  col = color(0,0,intensity*255)
    if (sdSphere(p, 250) > .01)    col = color(0,0,0)
    fill(col)
    push()
    translate(p.x+5, p.y+5, p.z+5)
    sphere(2);
    pop();
    }
  }
  

  
  /*  
  rotateX(((millis() % 6000)/6000)*360)
  rotateY(((millis() % 6000)/6000)*360)
  noStroke()


  for (let x = -400; x < 400; x+=5) {
    for (let y = -100; y < 100; y+=10) {
    let p = createVector(x, y, random(-(mouseX/w)*100, (mouseX/w)*100))
    // let p = createVector(x, y, random(-(mouseX/w)*x, (mouseX/w)*y))
    let b = createVector(0,0,0)

    if (sdBox(p, b) < -.01)  col = color(255,0,0)
    if (sdBox(p, b) > .01)    col = color(0,255,0)
    // if (sdBox(p, b) < 0 )    col = color(0,0,255)

    fill(col)
    
    push()
    translate(p.x, p.y, p.z)
    sphere(1);
    pop();
    }
  }
  */



}

