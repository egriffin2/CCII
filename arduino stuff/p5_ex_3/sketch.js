/*

Uses arduino2p5-STRING sketch

 */


var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14131'; // fill in your serial port name here
var inData; // for incoming serial data


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
    // text("sensor value: " + inData, 30, 30);
    graphData(inData);
}

let yPos;
let xPos = 0;


function graphData(newData) {
    // map the range of the input to the window height:
    var yPos = map(newData, 0, 1023, 0, height);
    // draw the line in a pretty color:
    stroke(0xA8, 0xD9, 0xA7);
    line(xPos, height, xPos, height - yPos);
    // at the edge of the screen, go back to the beginning:
    if (xPos >= width) {
        xPos = 0;
        // clear the screen by resetting the background:
        background(0x08, 0x16, 0x40);
    } else {
        // increment the horizontal position for the next reading:
        xPos++;
    }
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
        // convert it to a number:
        inData = Number(tempString);
        console.log(inData);
    }

}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}
