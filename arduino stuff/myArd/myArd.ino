const int buttonPin = 2;
int buttonState = 0;

void setup() {
  Serial.begin(9600); // initialize serial communications
  pinMode(buttonPin, INPUT);
}
 
void loop() {
  buttonState = digitalRead(buttonPin);
  int light = analogRead(A2);
  int potentiometer = analogRead(A0);
  int pot2 = analogRead(A1);  // read the input pin
  
  Serial.print(potentiometer);                             // print it out the serial port
  Serial.print(',');
    Serial.print(light);                             // print it out the serial port
  Serial.print(',');
//    Serial.print(potentiometer);                             // print it out the serial port
//  Serial.print(',');
  Serial.print(pot2);
  Serial.print(',');
    Serial.print(buttonState);
  Serial.println("");
  delay(1);                                            // slight delay to stabilize the ADC
}
