let w, h;
let pts = new Array();

let clearEveryMs = 1000;
let lastClear = 0;

let angle = 0;

let durationMs = 10000

let x = 0
let y = 0
let weight = 1

let active = true

function setup() {

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL);
}


function draw() {
//   clear()
   // let newx = (millis()/durationMs) * w
   let xscale = 30
   let yscale = (random(0,1)<.5) ? 50 : 10   

   let newx = (random(0,1)<.5) ? x+xscale : x-xscale
   let newy = (random(0,1)<.5) ? y+(random()*yscale) : y-(random()*yscale)

   newx = constrain(newx, -300, 300)
   newy = constrain(newy, -350, 350)

   noFill()
   stroke(255)

   // if (random(0,1) < .4) active = false
   // else                 active = true
   let m = millis() % 400
   let s = random()*80
   if (m > s && m < (s+20)) {
      active = !active
      weight = (random()*12)+.5
   }
   
   strokeWeight(weight)
   // if (active) line (x, y, newx, newy)
   if (active) (bezier(x, y, x+(random(-1,1)*10), y+(random(-1,1)*10), newx+(random(-1,1)*10), newy+(random(-1,1)*10), newx, newy))

   x = newx
   y = newy

}