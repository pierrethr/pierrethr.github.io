include('inc/rhill-voronoi-core.js');

const w = 640;
const h = 800;
let sites = new Array();
let trans = new Array();

const nStartSites = 20; 

let diagram;
let bbox;

let sampleInterval = 20;
let lastSampleTime = 0;
let speed = 5;

const nMaxSites = 100;  // max amount of sites
let addOrRemove = true;   // are we currently adding or removing sites? 
let addOnBounce = false;  // add 1 new site on every change of direction?


// ----------------------------------------------------------------------
function setup() {
  angleMode(DEGREES);
  noCursor();

  createCanvas(w, h);

  let x, y = 0;

  for (let s=0; s<nStartSites; s++) {
    addSite();
  }

  // for (let r=0; r<10; r++) {
  //   for (let c=0; c<5; c++) {
  //     addSite(c*200, r*200);
  //   }
  // }

  voronoi = new Voronoi();
  bbox = {xl: 10, xr: w-20, yt: 10, yb: h-20};

  diagram = voronoi.compute(sites, bbox);
  
}


function draw() {
  clear();
  fill(255);
  ellipse(mouseX, mouseY, 2, 2);
  // sites.forEach(drawSite);

  fill(255, 0, 0);
  // diagram.vertices.forEach(drawVertex);

  stroke(255);
  diagram.edges.forEach(drawEdge);

  diagram = voronoi.compute(sites, bbox);

  if (millis() - lastSampleTime >= sampleInterval) {
    sampleMouse();
    sites.forEach(moveSite);
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
  if (x == null)  sites.push(createVector((w/2)+random(-5, 5), h/2));
  else            sites.push(createVector(x, y));
  trans.push(createVector(random(-speed, speed), random(-speed, speed)));
}

function removeSite() {
  sites.pop();
  trans.pop();
}

function sampleMouse() {
  lastSampleTime = millis();
  if (mouseX > w || mouseY > h) return;
  sites.push(createVector(mouseX, mouseY));
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
  return (v.x < 0 || v.x > w || v.y < 0 || v.y > h);
}

function include(file) {
  
  var script  = document.createElement('script');
  script.src  = file;
  script.type = 'text/javascript';
  script.defer = true;
  
  document.getElementsByTagName('head').item(0).appendChild(script);
  
}