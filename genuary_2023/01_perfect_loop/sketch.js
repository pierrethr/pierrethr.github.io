let w, h;
let squares = new Array();

let spawnEveryMs = 500;
let lastSpawn = 0;

function setup() {
  angleMode(DEGREES);
  rectMode(RADIUS);

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);

  
}

function spawnRect() {
  let square = new Square(squares.length, w/2, h/2);
  squares.push(square)
  lastSpawn = millis();
}


function draw() {
  clear();
  noStroke();

  if (millis() - lastSpawn >= spawnEveryMs) spawnRect()

  translate(w/2, h/2)
  for (let s=0; s<squares.length; s++) {
    squares[s].draw();
  }
}


class Square extends p5.Vector {
  id = 0;
  size = 0;
  angle = 0;

  constructor(_id, _x, _y) {
    super(_x, _y, 0);

    this.id = _id;
    this.x = _x;
    this.y = _y;
    this.size = 10;
    this.angle = 0;
  }

  draw () {
    // if (this.angle == 5) this.angle = 0
    // else  this.angle += .02
      
    rotate(this.id*(360/9))
    console.log(this.id*(360/9))
    
    fill(255 * (this.id % 2 == 0));
    rect(0, 0, this.size, this.size)
    this.size += 2;
  }

}