var obj_pos = {r: 0, theta: 0};
var cart_coor;
var diam = 10;

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);
  frameRate(320);

  //polar coord (r,theta)
  //obj_pos = createVector(0,0);
  cart_coor = createVector(0,0);
}

function draw(){

  //obj_pos.x --> r
  //obj_pos.y --> theta
  cart_coor.x = obj_pos.r * cos(obj_pos.theta);
  cart_coor.y = obj_pos.r * sin(obj_pos.theta);

  if (cart_coor.x > 100) {
    cart_coor.x = obj_pos.r * sin(obj_pos.theta);
  } else if (cart_coor.x < 0) {
    cart_coor.x = obj_pos.r * tan(obj_pos.theta)
  }

  if (cart_coor.y > 100) {
    cart_coor.y = obj_pos.r * cos(obj_pos.theta);
  } else if (cart_coor.y < 0) {
    cart_coor.y = obj_pos.r * tan(obj_pos.theta)
  }

  push();
  noStroke();
  fill(15, random(120,230), random(255));
  translate(width/2, height/2);
  //line(0,0, cart_coor.x, cart_coor.y);
  ellipse(cart_coor.x, cart_coor.y, diam);

  pop();

  obj_pos.r += (diam*2)/256;
  obj_pos.theta += PI/128;

}
