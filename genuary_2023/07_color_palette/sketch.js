let colors = new Array();
let finalColors = new Array();
let w, h;

let img

let sel

function setup() {
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h, WEBGL);
  background(120);

  sel = createSelect();
  sel.position(w/2, 200);
  sel.option('blackfocus');
  sel.option('blockhead');
  sel.option('boards');
  sel.option('eruption');
  sel.option('homework');
  sel.option('iam');
  sel.option('koze');
  sel.option('pinata');
  sel.option('thestreets');
  sel.option('trammps');
  sel.changed(mySelectEvent);
}

function init(imgName) {
  while (colors.length > 0) {
    colors.pop()
  }
  while (finalColors.length > 0) {
    finalColors.pop()
  }

  img = loadImage('albums/' + imgName + '.jpeg', img => {
    image(img, 0, 0);

    img.loadPixels()
    console.log(img.pixels.length/4)


    let start = 0
    let n = 100

    for (let i = 0; i < (300*300)*4; i+= n) {
      let rs = 0
      let gs = 0
      let bs = 0

      for (let j = i; j < (i + n); j+=4) {
        // rs += img.pixels[j]
        // gs += img.pixels[j+1]
        // bs += img.pixels[j+2]
        if (img.pixels[j] > rs) rs = img.pixels[j]
        if (img.pixels[j+1] > gs) gs = img.pixels[j+1]
        if (img.pixels[j+2] > bs) bs = img.pixels[j+2]

        // console.log(img.pixels[j])
      }

      // let avgR = rs / n;
      // let avgG = gs / n;
      // let avgB = bs / n;

      // let c = color(avgR, avgG, avgB, 255)
      let c = color(rs, gs, bs, 255)
      colors.push(c)

      // console.log(avgR + ", " + avgG + ", " + avgB)
      // console.log(red(c))
    }

    finalColors.push(colors[0])

    for (let c = 1; c < colors.length; c++) {
      let similar = false;
      for (let fc = 0; fc < finalColors.length; fc++) {
        // console.log(colorDistance(colors[c], finalColors[fc]))

        if (colorDistance(colors[c], finalColors[fc]) < 100)  similar = true;
      }

      if (!similar)  finalColors.push(colors[c])
    }

  });
}


function draw() {
  background(0)
  clear();
  translate(-100, -200)
  noStroke()
  

  let y = 320
  let cols = 7

  // for (let c = 0; c < colors.length; c++) {
  //   if ((c%cols) == 0) y += 15
  //   fill(colors[c])
  //   rect((((c%cols)*10)+10), y, 8, 8)
  // }

  let r = 250;
  let xc, yc = 0;

  let overlap = 1.2
  let wc = 3 * (r/overlap)
  let hc = (finalColors.length / 3) * (r/overlap)
  
  push()
  translate(-wc/6, -hc/2)
  for (let c = 0; c < finalColors.length; c++) {
    xc = (c % 3) * (r/overlap);
    if (c % 3 == 0) yc += (r/overlap);

    if (finalColors.length > 0) fill(red(finalColors[c]), green(finalColors[c]), blue(finalColors[c]), random()*255)
    circle (xc, yc, random(100, r));
  }
  pop()

  // for (let c = 0; c < 3; c++) {
  //   for (let r = 0; r < 3; r++) {
      
  //     if (finalColors.length > 0) fill(red(finalColors[c+r]), green(finalColors[c+r]), blue(finalColors[c+r]), 255)
  //     // console.log(finalColors.length)
  //     // circle(c * 200, r * 200, abs(sin(millis()/100) + (cos(c+r)/9))*400)
  //     circle(c * 200, r * 200, random(100, 400))
  //   }
  // }

  // for (let fc = 0; fc < finalColors.length; fc++) {
  //   if ((fc%cols) == 0) y += 100
  //   fill(finalColors[fc])
  //   rect((((fc%cols)*100)), y, 100, 100)
  //   console.log("yo")
  // }

  if (img) image(img, -50, 0)

  



}


function mySelectEvent() {
  let item = sel.value();
  init(item)
  // background(200);
  // text('It is a ' + item + '!', 50, 50);
}

function colorDistance(first, second) {

  let r = abs(red(first) - red(second));
  let g = abs(green(first) - green(second));
  let b = abs(blue(first) - blue(second));

  return r + g + b;
}

