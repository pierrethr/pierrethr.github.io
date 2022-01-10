let w, h;
let hoops = new Array();


const spawnDelay = 600;
let lastSpawnTime = 0;
let angleInc = 6; // higher = faster, can NOT be a multiple of 7
let diamInc = 20;
let ampInc = 4;
let spawnPosState = 0; // range [0-4]  0 = center, 1 = top, 2 = right, 3 = bottom, 4 = left

function setup() {
  angleMode(DEGREES);

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);

  noFill();
  
  spawnHoop();
  // stroke(255);
}

function draw() {
  clear();
  stroke(255);

  // if (millis() - lastSpawnTime >= spawnDelay) spawnHoop();

  let alpha = 0;
  for (let h=0; h<hoops.length; h++) {
    // alpha = ((h+1)/(hoops.length+1))*255;
    // stroke(255, 255, 255, alpha);
    // console.log(alpha);

    hoops[h].draw();
  }
}

function spawnHoop() {
  console.log("SPAWN");
  if (hoops.length == 0) {
    hoops.push(new Hoop(hoops.length+1, w/2, h/2, 200, 2));
  } else {
    let pos = getSpawnPos();
    // hoops.push(new Hoop(hoops.length+1, pos.x, pos.y, hoops[hoops.length-1].diam+diamInc, hoops[hoops.length-1].amplitude + ampInc));
    hoops.push(new Hoop(hoops.length+1, w/2, h/2, hoops[hoops.length-1].diam+1, hoops[hoops.length-1].amplitude + ampInc));
  }
  lastSpawnTime = millis();
}

function getSpawnPos() {
  let p = createVector(hoops[0].x, hoops[0].y);
  let r = hoops[0].diam/2;

  if (spawnPosState == 1)       p.add(0, -r);
  else if (spawnPosState == 2)  p.add(r, 0);
  else if (spawnPosState == 3)  p.add(0, r);
  else if (spawnPosState == 4)  p.add(-r, 0);

  if (spawnPosState < 4)  spawnPosState++;
  else                    spawnPosState = 0;

  return p;
}

class Hoop extends p5.Vector {
  id = 0;
  diam = 0;
  amplitude = 0;
  drawPoint = 0;
  ampAngle = 0;
  dir = 1;

  constructor(_id, _x, _y, _diam, _amplitude) {
    console.log("new hoop " + _x + ", " + _y + ", " + _diam + ", " + _amplitude);
    super(_x, _y, 0);
    this.id = _id;
    this.x = _x;
    this.y = _y;
    this.diam = _diam;
    this.amplitude = _amplitude;
    this.drawPoint = createVector(0,0);
    // this.dir = this.id % 2 == 0 ? 1 : -1;
  }

  draw () {
    // console.log(abs(this.ampAngle));
    // console.log(this.id + " : " + hoops.length);
    
    if (this.shouldSpawnNew() && this.id == hoops.length) {
      this.ampAngle = 0;
      spawnHoop();
      
    } else {
      this.drawPoint.set(this.x + this.amplitude * cos(this.ampAngle), this.y + this.amplitude * sin(this.ampAngle));
      this.ampAngle += angleInc * this.dir;
    }
    
    ellipse(this.drawPoint.x, this.drawPoint.y, this.diam, this.diam);
    // ellipse(this.x, this.y, this.diam, this.diam);
  }

  shouldSpawnNew() {
    let a = abs(this.ampAngle);
    return (a == 360);
    // return (a == 90 || a == 180 || a == 270 || a == 360);
  }
}