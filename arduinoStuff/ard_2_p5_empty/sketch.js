
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14231'; // fill in your serial port name here
var sensors;

var pot1 = 0;
var pot2 = 0;
var light = 0;
var button = 0;

//Drawing Variables
var obj_pos = {r: 0, theta: 0};
var cart_coor;
var diam = 10;



function setup() {

    createCanvas(windowWidth, windowHeight);
    background(255);

    //drawing
    cart_coor = createVector(0,0);

    //arduino
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}

function draw() {
  //checking arduino controls
  fill(0);
  text(pot1, 30, 30);
  text(pot2, 30, 50);
  text(light, 30, 70);
  text(button, 30, 90);

  //actual Drawing
  cart_coor.x = obj_pos.r * cos(obj_pos.theta);
  cart_coor.y = obj_pos.r * sin(obj_pos.theta);

  if (button > 0) {
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

  //end drawing



}


// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.');
}

function serialEvent() {
    // read a string from the serial port:
    var tempString = serial.readLine();
    // check to see that there's actually a string there:
    if (tempString.length > 0) {
        let sensors = tempString.split(',');
        for (let i = 0; i < sensors.length; i++){
          sensors[i] = Number(sensors[i]);
        }
        pot1 = sensors[0];
        pot2 = sensors[1];
        light = sensors[3];
        button = sensors[4];
        console.log(sensors);
    }

}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}
