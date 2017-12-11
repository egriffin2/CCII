/*

Uses

 */


var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14231'; // fill in your serial port name here
var sensors;

var pot1 = 0;
var pot2 = 0;
var light = 0;
var button = 0;



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

  if (button = 1) {
    background(255);
  } else if (button = 0) {
    background(0);
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
