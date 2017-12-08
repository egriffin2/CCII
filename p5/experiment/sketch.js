var coordx = random(10,200);
var coordy = random(10,300);

function setup() {

  createCanvas(windowWidth,windowHeight);

}

function draw() {
  background(255);


  fill(0);
  quad(coordx, coordy, 10,400, 500, 10, 500, 400);
}
