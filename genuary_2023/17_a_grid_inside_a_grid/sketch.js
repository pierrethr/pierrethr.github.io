let w, h;
let bounds = new Array();

let clearEveryMs = 1000;
let lastClear = 0;

let angle = 0;

let durationMs = 10000

let x = 0
let y = 0
let weight = 1

let active = true

let s = 200

function setup() {

  w = windowWidth;
  h = windowHeight;

//   s = h

  createCanvas(w, h, WEBGL);

  let tl = createVector(-1, -1)
  let tr = createVector(1, -1)
  let br = createVector(1, 1)
  let bl = createVector(-1, 1)

  let rnd;

  bounds.push([tl, tr, br, bl])

  for (let i = 0; i < round(random()*5); i++) {
        rnd = createVector(random(-1, 1), random(-1, 1))

        bounds[bounds.length-1].push(rnd)
  }


  
  

  
}

function lineLineIntersection(A,B,C,D){
   // Line AB represented as a1x + b1y = c1
   var a1 = B.y - A.y;
   var b1 = A.x - B.x;
   var c1 = a1*(A.x) + b1*(A.y);
   
   // Line CD represented as a2x + b2y = c2
   var a2 = D.y - C.y;
   var b2 = C.x - D.x;
   var c2 = a2*(C.x)+ b2*(C.y);
   
   var determinant = a1*b2 - a2*b1;
   
   if (determinant == 0)
   {
       // The lines are parallel. This is simplified
       // by returning a pair of FLT_MAX
       return createVector(Number.MAX_VALUE, Number.MAX_VALUE);
   }
   else
   {
       var x = (b2*c1 - b1*c2)/determinant;
       var y = (a1*c2 - a2*c1)/determinant;
       return createVector(x, y);
   }
}


function draw() {
   
   // clear()
   // noStroke()
   // fill(255)
   
   stroke(255)
   strokeWeight(1)

   // s = sin(millis()/20)*20

   
   // scale(abs(sin(millis()/2000))*10)
   // translate(-s/2, 0)
   // push()
   
   for (let b = 0; b < bounds.length; b++) {
      
      // translate(s, 0)
      let tl = bounds[b][0].mult(s)
      let tr = bounds[b][1].mult(s)
      let br = bounds[b][2].mult(s)
      let bl = bounds[b][3].mult(s)

      line(tl.x, tl.y, tr.x, tr.y)
      line(tr.x, tr.y, br.x, br.y)
      line(br.x, br.y, bl.x, bl.y)
      line(bl.x, bl.y, tl.x, tl.y)


      for (let pindex = 4; pindex < (4+(bounds[b].length-4)); pindex++) {

         let p = bounds[b][pindex].mult(s)
         // circle(p.x, p.y, 5)
         
         let projTop = createVector(p.x, tl.y)
         let projRight = createVector(tr.x, p.y)
         let projBottom = createVector(p.x, br.y)
         let projLeft = createVector(bl.x, p.y)
         

         fill(0, 255, 0)

         let i = lineLineIntersection(p, projTop, bounds[b][0], bounds[b][1] )
         // circle(i.x, i.y, 5)
         line (p.x, p.y, projTop.x, projTop.y)

         i = lineLineIntersection(p, projRight, bounds[b][1], bounds[b][2] )
         // circle(i.x, i.y, 5)
         line (p.x, p.y, projRight.x, projRight.y)

         i = lineLineIntersection(p, projBottom, bounds[b][2], bounds[b][3] )
         // circle(i.x, i.y, 5)
         line (p.x, p.y, projBottom.x, projBottom.y)

         i = lineLineIntersection(p, projLeft, bounds[b][3], bounds[b][0] )
         // circle(i.x, i.y, 5)
         line (p.x, p.y, projLeft.x, projLeft.y)
      }
      

   }
   // pop()
}