let w, h;

const pSize = 7;
const pDrawSize = 5; // size of each pixel

let origin;

let patterns = new Array();


// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  // ellipseMode(CORNER);
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL); 
  origin = createVector(-(w/2), -(h/2));

  for (let p=0; p<16; p++) {
    patterns.push(new AnimatedPattern());
  }
  
}



// --------------------------------------------
function draw() {
  // ellipse(toWebGLCoords(20,20).x, toWebGLCoords(20,20).y, 5, 5 );

  let spacing = 100;
  let gridW = ((pDrawSize * pSize) + spacing)*4;
  
  push();
    translate(- (gridW/2)-(gridW/6), -(pDrawSize*pSize)-gridW/3); // offsetting because origin of canvas in WEBGL renderer is the center of the window
    for (let p=1; p<=patterns.length; p++) {
      translate(pDrawSize*pSize + 100, 0);
      patterns[p-1].draw();

      if (p %4 == 0 && p!=0) {
        translate(-gridW, pDrawSize*pSize + 100);
      }
    }
    
  pop();

}

// --------------------------------------------
function toWebGLCoords(_x, _y) {
  return origin.copy().add(createVector(_x, _y));
}


// ===============================================================
class AnimatedPattern {
  pattern = null;

  animDelay = 80;
  lastAnimTime = 0;

  // --------------------------------------------
  constructor() {
    // creates an array twice the size of the one being drawm
    //  to allow for diagonal looping of pixels
    //  (ie pixels that exit from the top-right part of array during animation spawn back into the bottom-left part on next frame)
    this.pattern = new Array(pSize*2);
    for (let row=0; row<this.pattern.length; row++) {
      this.pattern[row] = new Array(pSize*2);
    }

    for (let row=0; row<this.pattern.length/2; row++) {
      for (let col=(pSize-1); col<this.pattern.length; col++) {
        // let c = Math.round(random(0, row));
        // this.pattern[row][col] = c < row/4 ? 1 : 0;

        let c = Math.round(random(0, 2));
        this.pattern[row][col] = c < .1 ? 1 : 0;
      }
    }
  }

  // --------------------------------------------
  draw() {
    if (millis() - this.lastAnimTime >= this.animDelay) this.animate();


    push();
      
      this.drawPattern();

      rotateY(-180);
      this.drawPattern();

      translate(0, (pDrawSize*pSize)*2  );
      rotateY(-180);
      rotateX(180);
      this.drawPattern();

      rotateY(-180);
      this.drawPattern();
    pop();
  }


  // --------------------------------------------
  drawPattern() {
    // draw only the top-right part of the array
    for (let row=0; row<this.pattern.length/2; row++) {
      for (let col=(pSize-1); col<this.pattern.length; col++) {
        let x = (col-pSize-1) * pDrawSize;
        let y = row * pDrawSize;

        fill (255 * this.pattern[row][col]);
        rect(x, y, pDrawSize, pDrawSize);
      }
    }

    /*
    stroke(0,255,0);
    noFill()
    rect(0,0, pDrawSize*pSize, pDrawSize*pSize);
    noStroke();
    */
  }

  // --------------------------------------------
  animate() {
    for (let row=0; row<this.pattern.length; row++) {
      for (let col=0; col<this.pattern.length; col++) {
        if (row-1 >= 0 && col+1 < this.pattern.length) {
          this.pattern[row-1][col+1] = this.pattern[row][col];
          this.pattern[row][col] = 0;
        } else {

          // make sure the pixel sits in the top-right part of the array
          //  (the one actually being drawn)
          if (row < pSize && col >= pSize-1) {
            if (row-1 < 0 || col+1 >= this.pattern.length)  {
              let r = row+(this.pattern.length/2);
              let c = col-(this.pattern.length/2);

              this.pattern[r][c] = this.pattern[row][col];
            }
          }

          this.pattern[row][col] = 0;
        }
        
      }
    }

    this.lastAnimTime = millis();
  }


}