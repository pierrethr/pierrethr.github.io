let w, h;
let pts = new Array();

let clearEveryMs = 1000;
let lastClear = 0;

let angle = 0;

let durationMs = 10000

let x = 0
let y = 0
let weight = .4

let active = true

let circleStep = .2
let xAmp = 300
let yAmp = 300


function setup() {

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL);
}


function draw() {
  clear()
  let A = createVector(0,0)
  let B = createVector(0, 0)
  stroke(255)
  strokeWeight(weight)

  push()
  rotateZ(sin(millis()/1000)*2)

  A.x += cos(millis()/500)*300

  for (let i = 0; i < TWO_PI; i+= circleStep) {
   // A.x += sin(millis()/1200)*10
   B.x = sin(i) * xAmp
   B.x += sin(millis()/1200)*10
   B.y = cos(i) * yAmp
   line(A.x, A.y, B.x, B.y)
  }
  pop()

  A.x += sin(millis()/500)*300

  push()
  rotateZ(sin(millis()/1200)*1)
  for (let i = 0; i < TWO_PI; i+= circleStep) {
   // A.x += sin(millis()/1200)*10
   B.x = sin(i) * xAmp
   B.y = cos(i) * yAmp
   line(A.x, A.y, B.x, B.y)
  }
  pop()


  A.y += sin(millis()/500)*300

  push()
  rotateZ(cos(millis()/1200)*1)
  for (let i = 0; i < TWO_PI; i+= circleStep) {
   // A.x += sin(millis()/1200)*10
   B.x = sin(i) * xAmp
   B.y = cos(i) * yAmp
   line(A.x, A.y, B.x, B.y)
  }
  pop()

  A.y += cos(millis()/500)*300

  push()
  rotateZ(cos(millis()/1200)*1)
  for (let i = 0; i < TWO_PI; i+= circleStep) {
   // A.x += sin(millis()/1200)*10
   B.x = sin(i) * xAmp
   B.y = cos(i) * yAmp
   line(A.x, A.y, B.x, B.y)
  }
  pop()


//   A.y += sin(millis()/500)*300

//   rotateZ(sin(millis()/1000)*1)
//   for (let i = 0; i < TWO_PI; i+= circleStep) {
//    B.x = sin(i) * 300
//    B.y = cos(i) * 300
//    line(A.x, A.y, B.x, B.y)
//   }
  

}