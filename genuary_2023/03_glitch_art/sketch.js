let w, h;
let bounds = new Array();

let img
let bufferImg
let capture

function setup() {

  w = windowWidth;
  h = windowHeight;

//   s = h

  createCanvas(w, h, WEBGL);


  capture = createCapture(VIDEO);
  capture.size(320, 240);
  img = createImage(320, 240)
  bufferImg = createImage(320, 240) 
//   img = loadImage('images/boards.jpeg')

  
}



function draw() {
   // pixel location = X+(Y*WIDTH)
   clear()

   img.copy(capture, 0, 0, 320, 240, 0, 0, 320, 240)
   img.loadPixels()

   
   bufferImg.loadPixels()
   noFill()

   let xs, ys, ws, hs
   let xt, yt


   let ncols = (mouseX/windowWidth)*30
   // ncols = constrain(ncols, 2, 20)
   ncols = 1

   let nrows = (mouseY/windowHeight)*20
   // nrows = constrain(ncols, 2, 20)
   nrows = 240

   xs = 0
   ys = 0
   // ws = round((img.width/(ncols)))
   ws = img.width
   
   // ws = 100
   hs = round((img.height/(nrows)))

   for (let col = 0; col < ncols; col++) {
      // if (col % 2 == 0) xs = (col/(ncols-1)) * img.width
      // if (col % 2 == 0) xs = ws*col
      // if (random(0,1) < abs(sin(millis()/2000))+.2)   xs = ws*col
      xs = ws*col
      xs += round(random(-200, 200))

      for (let row = 0; row < nrows; row++) {
         if (random(0,1) < abs(sin(millis()/2000)))   ys = hs*row
         
         // if (row % 2 ==0) ys = (row/nrows) * (img.height)
         // if (row % 2 ==0) ys = (row/(nrows-1)) * img.height
   
         for (let x = xs; x < (xs+ws); x++) {
            for (let y = ys; y < (ys+hs); y++) {
               let indexS = (x + y * img.width) * 4
      
               // xt = img.width - x
               xt = x-ws
               yt = y
               xt += x*4
      
               let indexT = (xt + yt * img.width) * 4
      
               img.pixels[indexS]   = img.pixels[indexT]
               img.pixels[indexS+1] = img.pixels[indexT+1]* ((random(0,1)) * random(0,10))
               img.pixels[indexS+2] = img.pixels[indexT+2]//* ((random(0,1)) * random(0,1))
               // img.pixels[indexS+3] = (y/(ys+hs))*255
               img.pixels[indexS+3] = random(0,1) < .3 ? 0 : 255


               // img.pixels[indexS+3] = (y/(ys+hs))*255

               
               // stroke(255,0,0)
               // rect(xs, ys, ws, hs)

               // rect(xt, yt, ws, hs)
            }
         }
      }
   }

   /*
   let inc = 0
   let dir = 1

   for (let x = 0; x < img.width; x++) {
       
      if (inc == 100) inc = 0
      // let dir = ( random(-1, 1) < 0 ? -1 : 1 )
      for (let y = 0; y < img.height; y++) {
         inc = (y % 20) 

         // if (y % 20 == 0) dir *= -1
         // inc *= round((mouseX/w)*10)
         inc *= round(abs(sin(millis()/500)) * (10*dir))
         
         
         let indexS = (x + y * img.width) * 4
         let indexT = (x+inc + (y+1) * img.width) * 4

         bufferImg.pixels[indexS]   = img.pixels[indexT]
         bufferImg.pixels[indexS+1] = img.pixels[indexT+1]
         bufferImg.pixels[indexS+2] = img.pixels[indexT+2]
         bufferImg.pixels[indexS+3] = img.pixels[indexT+3]
      }
   }
   */
   

   

   // for (let x = 0; x < img.width/2; x++) {
   //    for (let y = 0; y < img.height/2; y++) {
   //       let index = (x + y * img.width) * 4;

   //       // img.pixels[index] = 255
   //       // img.pixels[index+1] = 0
   //       // img.pixels[index+2] = 0

   //       let rnd = index*round(random(2,10))
   //       img.pixels[index] = img.pixels[rnd]
   //       img.pixels[index+1] = img.pixels[rnd+1]
   //       img.pixels[index+2] = img.pixels[rnd+2]
   //       img.pixels[index+3] = 255
   //    }
   // }

   
   // for (let d = 3000; d<60000; d++) {
   //    let i = round(random()*img.pixels.length)
   //    img.pixels[d] = img.pixels[i]
   //    img.pixels[d+1] = img.pixels[i+1]
   //    img.pixels[d+2] = img.pixels[i+2]
   // }

   
   img.updatePixels()
   // bufferImg.updatePixels()

   // image(bufferImg, 0,0, 640, 480 )
   image(img, 0,0, 640, 480 )
}