/*

Uses arduino2p5-STRING sketch

 */


var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14231'; // fill in your serial port name here
var inData; // for incoming serial data
var pot1 = 0;
var pot2 = 0;
var light = 0;
var but = 0;


function setup() {
    createCanvas(400, 300);
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
    // background(0);
    // fill(255);
     text("sensor value: " + light, 30, 30);
     //text("sensor value" + but, 30, 50);
    graphData(inData);
}

let yPos;
let xPos = 0;


function graphData(newData) {
    background(0);
    angleMode(DEGREES);
    // map the range of the input to the window height:
    var yPos = map(pot1, 0, 1023, 0, 360);
    // draw the line in a pretty color:
    let col = map(pot2, 0, 1023, 0, 255);
    let num = map(light, 0, 1023, 0, 100);
    //let but2 = map(but, 0, 1, 0, 100);
    stroke(col);
    strokeWeight(10);
    text(num, 30, 50); //SOMETHING IS WRONG
  /*  line(xPos, height, xPos, height - yPos); //CREATES LINE
    // at the edge of the screen, go back to the beginning:
    if (xPos >= width) {
        xPos = 0;
        // clear the screen by resetting the background:
        background(0x08, 0x16, 0x40);
    } else {
        // increment the horizontal position for the next reading:
        xPos++;
    } /*/
    arc(width/2, height/2, 300, 300, yPos, -HALF_PI)
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
        // convert it to a number:
        //inData = Number(tempString);
        //console.log(inData);
        pot1 = sensors[0];
        pot2 = sensors[1];
        light = sensors[2];
        but = sensors[3];
    }

}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}
