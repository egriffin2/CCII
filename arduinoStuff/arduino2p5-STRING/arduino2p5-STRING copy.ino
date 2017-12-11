void setup() {
  Serial.begin(9600); // initialize serial communications
}
 
void loop() {
  int potentiometer = analogRead(A0);
  int pot2 = analogRead(A1);  // read the input pin
  int mappedPot = map(potentiometer, 0, 1023, 0, 255); // remap the pot value to fit in 1 byte
  Serial.print(potentiometer);                             // print it out the serial port
  Serial.print(',');
  Serial.println(pot2);
  delay(1);                                            // slight delay to stabilize the ADC
}
