let w, h;
let shapes = new Array();

let clearEveryMs = 1000;
let lastClear = 0;

let offset = 30


function setup() {
   angleMode(DEGREES);
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL);
  newShapes()
}

function newShapes() {
   shapes = new Array();

   let nShapes = round(random(5, 30))

   for (let s = 0; s < nShapes; s++) {
      let shape = new Shape(random()*600, random()*800)

      if (!overlaps(shape))   shapes.push( shape );
   }

}

function overlaps(shape) {
   let r = false
   for (let s = 0; s < shapes.length; s++) {
      if (shape.tl.x > shapes[s].tl.x && shape.tl.x < shapes[s].br.x)   r = true
      if (shape.tr.x > shapes[s].tl.x && shape.tr.x < shapes[s].br.x)   r = true
      if (shape.br.x > shapes[s].tl.x && shape.br.x < shapes[s].br.x)   r = true
      if (shape.bl.x > shapes[s].tl.x && shape.bl.x < shapes[s].br.x)   r = true
   }

   return r
}


function draw() {
   // translate(-w/2, -h/2)
  clear()
  fill(0,0,0)
// noFill()

  for (let s = 0; s < shapes.length; s++) {
   shapes[s].draw();
  }
  
  noFill()
  rect(offset,offset,600,800)
}


class Shape extends p5.Vector {
   tl = createVector(0,0)
   tr = createVector(0,0)
   br = createVector(0,0)
   bl = createVector(0,0)

   angle = 0
 
   constructor(_x, _y) {
     super(_x, _y, 0);

     let sw = random() * 200
     let sh = random() * 200

     this.tl.x = _x - (sw/2)
     this.tl.y = _y - (sh/2)

     this.tr.x = _x + (sw/2)
     this.tr.y = _y - (sh/2)

     this.br.x = _x + (sw/2)
     this.br.y = _y + (sh/2)

     this.bl.x = _x - (sw/2)
     this.bl.y = _y + (sh/2)

     this.tl.add(createVector(random()*5, random()*5))
     this.tr.add(createVector(random()*5, random()*5))
     this.br.add(createVector(random()*5, random()*5))
     this.bl.add(createVector(random()*5, random()*5))

     this.angle = random(-20,20)
 
   }
 
   draw () {
      // translate(this.x, this.y)
      push()
      translate(this.x, this.y)
      rotateZ(this.angle) 

      fill(0)
      beginShape()
      vertex(this.tl.x, this.tl.y)
      vertex(this.tr.x, this.tr.y)
      vertex(this.br.x, this.br.y)
      vertex(this.bl.x, this.bl.y)
      
      endShape(CLOSE)
      


      fill(255,0,0)
      noStroke()
      circle(this.x,this.y,10)

      pop()
   }
 
 }