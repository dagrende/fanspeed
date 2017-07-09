void setup() {
  // PWM output for motor speed
  pinMode(1, OUTPUT);

  // switch A
  pinMode(0, INPUT);
  digitalWrite(0, 1); // set pull-up mode

  // switch B
  pinMode(2, INPUT);
  digitalWrite(2, 1); // set pull-up mode


}

// position change based on [fromSwitches][toSwitches]
// where switches is two bits AB
char changeTable[4][4] = {
 //00  01  10  11 - oldSwitches
  { 0,  1, -1,  0}, //00 - switches
  {-1,  0,  0,  1}, //01
  { 1,  0,  0, -1}, //10
  { 0, -1,  1,  0}  //11
};

long position = 0;
char oldSwitches = 0;

void loop() {
  char switches = (digitalRead(0) << 1) + digitalRead(2);
  char change = changeTable[oldSwitches][switches];
  position += change;
  oldSwitches = switches;

  if (change != 0) {
    if (position < 0) {
      position = 0;
    }
    if (position > 1023) {
      position = 1023;
    }

    analogWrite(1, (int)(position & 1023));
  }
}
