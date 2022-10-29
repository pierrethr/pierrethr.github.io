include('inc/rhill-voronoi/rhill-voronoi-core.js');

const w = 640;
const h = 800;
let sites = new Array();
let trans = new Array();
let oldEdges = new Array();

let nStartSites = 20; 
let bDrawSites = false;
let bAnimateNewSites = false;

let diagram;
let bbox;

let sampleInterval = 20;
let bUseMouse = true;

let lastSampleTime = 0;
let speed = 0;

let nMaxSites = 100;  // max amount of sites
let addOrRemove = true;   // are we currently adding or removing sites? 
let addOnBounce = false;  // add 1 new site on every change of direction?

let bDrawOldEdges = false;


// ----------------------------------------------------------------------
function setup() {
  angleMode(DEGREES);
  noCursor();

  createCanvas(w+100, h);

  init();
}

function init() {
  sites = new Array();
  trans = new Array();

  let x, y = 0;
  let rows = ceil(sqrt(nStartSites));
  let cols = floor(sqrt(nStartSites));
  let xinc = (w-20) / (cols+1);
  let yinc = (h-20) / rows;

  xinc += ((xinc/2));

  for (let r=0; r<rows; r++) {
    for (let c=0; c<cols; c++) {
      x = (c * xinc) + (xinc/2) + 10;
      y = (r * yinc) + (yinc/2);

      if (r%2 == 0) x-= xinc/2;


      // x = constrain(x, 10, w-20);
      // y = constrain(y, 10, h-20);

      addSite(x, y);
    }
  }


  voronoi = new Voronoi();
  bbox = {xl: 10, xr: w-20, yt: 10, yb: h-20};

  diagram = voronoi.compute(sites, bbox);
}


function draw() {
  clear();
  fill(255);
  ellipse(mouseX, mouseY, 2, 2);
  if (bDrawSites)  sites.forEach(drawSite);

  fill(255, 0, 0);
  // diagram.vertices.forEach(drawVertex);

  
  if (bDrawOldEdges) {
    stroke(255, 0, 255, 255);
    oldEdges.forEach(drawEdge);
  }
  

  diagram = voronoi.compute(sites, bbox);

  stroke(255);
  diagram.edges.forEach(drawEdge);

  if (speed > 0)  sites.forEach(moveSite);

  if (millis() - lastSampleTime >= sampleInterval) {
    lastSampleTime = millis();

    oldEdges = [...diagram.edges];
    if(bUseMouse) sampleMouse();  
    // sites.push(createVector(random(w), random(h)));
  }
  
}

function moveSite(item, index) {
  item.add(trans[index]);

  if (isOut(item)) {
    trans[index].x *= -1;
    trans[index].y *= -1;
    
    if (!addOnBounce) return;

    if (sites.length < nMaxSites) {
      if (addOrRemove)  addSite();
      else              removeSite();

      if (sites.length == 2)  addOrRemove = true;

    } else if (sites.length >= nMaxSites) {
      addOrRemove = false;
      removeSite();
    }
  }
}


function addSite(x = null, y = null) {
  console.log("add at: " + x + ", " + y);
  if (x == null)  sites.push(createVector((w/2)+random(-5, 5), h/2));
  else            sites.push(createVector(x, y));
  
  trans.push(createVector(random(-speed, speed), random(-speed, speed)));
}

function updateSpeed() {
  for (let i=0; i<trans.length; i++) {
    trans[i] = createVector(random(-speed, speed), random(-speed, speed));
  }
  
}

function removeSite() {
  sites.pop();
  trans.pop();
}

function sampleMouse() {
  if (mouseX > w || mouseY > h) return;
  sites.push(createVector(mouseX, mouseY));
  if (bAnimateNewSites) trans.push(createVector(random(-speed, speed), random(-speed, speed)));
  // sites[0].x = mouseX;
  // sites[0].y = mouseY;
}

function drawSite(item) {
  ellipse(item.x, item.y, 2, 2);
  // item.add(random(.3)*random(-10,10));
}

function drawVertex(item) {
  ellipse(item.x, item.y, 10, 10);
}

function drawEdge(item) {
  line(item.va.x, item.va.y, item.vb.x, item.vb.y);
}

function isOut(v) {
  return (v.x < 0 || v.x > (w+200) || v.y < 0 || v.y > h);
}

function include(file) {
  
  var script  = document.createElement('script');
  script.src  = file;
  script.type = 'text/javascript';
  script.defer = true;
  
  document.getElementsByTagName('head').item(0).appendChild(script);
  
}