let w, h;

let radius = 30;
let points = new Array();

let spawnAngle = 0;
let center;
let spawnPoint;

let spawnDelay = 100;
let lastSpawn = 0;
let pointsCount = 0;
let spawnRadius = 10;

const drawLines = false;
const autoSpawn = true;
const drawOrigin = false;

const maxDistance = radius*10;

// --------------------------------------------
function setup() { 
  angleMode(DEGREES);
  w = windowWidth;
  h = windowHeight;

  center = createVector(w/2, h/2);
  spawnPoint = createVector(center.x+10, center.y);

  createCanvas(w, h);
}

function draw() {
  clear();

  if (millis() - lastSpawn >= spawnDelay && autoSpawn) spawnPointAt(spawnPoint.copy());


  for (let p=0; p<points.length; p++) {
    points[p].draw();
  }

  if (drawOrigin) {
    noStroke();
    fill(0,255,0);
    ellipse(center.x, center.y, 10, 10);
    ellipse(spawnPoint.x, spawnPoint.y, 10, 10);
  }
  
  
  // spawnPoint.set(center.x + sin(frameCount/2)*360, center.y+ sin(frameCount/2)*10);

  spawnPoint.set(center.x + spawnRadius * cos(spawnAngle), center.y + spawnRadius * sin(spawnAngle));
  spawnAngle = sin(frameCount/2)*360;
  spawnDelay = 150+sin(frameCount/5)*100
  ;
  // radius = sin(frameCount/2)*40;
  // spawnRadius = sin(frameCount/20)*maxDistance;
}

function spawnPointAt(_pos) {
  points.push(new Point(_pos, pointsCount));
  lastSpawn = millis();
  pointsCount++;
  if (points.length>=2) points[points.length-2].isNew = false;
}

function mouseReleased() {
  spawnPointAt(createVector(mouseX, mouseY));
}

// ===============================================================
class Point {
  id = -1;
  pos = 0;
  isNew = true;
  spawnTime = 0;

  // ---------------------------------------
  constructor (_pos, _id) {
    this.id = _id;
    this.pos = _pos;
    this.spawnTime = millis();
  }

  // ---------------------------------------
  draw () {
    this.update();

    /*
    if (this.isNew) {
      fill(255);
      noStroke();
    } else {
      noFill();
      stroke(255);
    }
    */

    noFill();

    // let c = ((millis() - this.spawnTime)/3000) + .2;
    // stroke(c*255);
    stroke(255);
    
    ellipse(this.pos.x, this.pos.y, radius, radius);

    spawnAngle++;
    
  }

  update() {
    if (this.pos.dist(center) >= maxDistance) this.remove();

    for (let p=0; p<points.length; p++) {
      if (points[p].id == this.id)  break;

      let diff = points[p].pos.copy().sub(this.pos);
      if (diff.mag() < radius)  diff.setMag(radius/4);

      if (diff.mag() < radius) {
        this.pos.sub(diff);
        points[p].pos.add(diff);
      }

      if (drawLines) {
        stroke(0,255,0);
        line(this.pos.x, this.pos.y, points[p].pos.x, points[p].pos.y);
      }
    }
  }

  remove() {
    for (let p=0; p<points.length; p++) {
      if (points[p].id == this.id)  points.splice(p, 1);
    }
    delete this;
  }

}

