#include <Arduino.h>
// #include <EEPROM.h>

char encoderChange(char a, char b);

long position = 0;
bool unsavedChange = 0;
unsigned long saveMillis;

void setup() {
  // PWM output for motor speed
  pinMode(1, OUTPUT);

  // switch A
  pinMode(0, INPUT);
  digitalWrite(0, 1); // set pull-up mode

  // switch B
  pinMode(2, INPUT);
  digitalWrite(2, 1); // set pull-up mode

  // EEPROM.get(0, position);
  // if (position & ~1023 != 0) {
  //   position = 0;
  // }
}

void loop() {
  char change = encoderChange(digitalRead(0), digitalRead(2));
  if (change != 0) {
    position += change;

    if (position < 0) {
      position = 0;
    } else if (position > 1023) {
      position = 1023;
    }

    analogWrite(1, (int)(position & 1023));

    // schedule save position to eeprom
    unsavedChange = true;
    saveMillis = millis();
  } else {
    // if change to save and time has passed - mark as saved and save position
    if (unsavedChange && (millis() - saveMillis) > 1000) {
      unsavedChange = false;

      // EEPROM.put(0, position);
    }
  }
}

// call contonously with the two phases A, B of the quadrature encoder
// returns the change to the position based on any quadrature switch change
char encoderChange(char a, char b) {
  // position change based on [fromSwitches][toSwitches]
  // where switches is two bits AB
  static char changeTable[4][4] = {
   //00  01  10  11 - prevSwitches
    { 0,  1, -1,  0}, //00 - switches
    {-1,  0,  0,  1}, //01
    { 1,  0,  0, -1}, //10
    { 0, -1,  1,  0}  //11
  };
  static char prevSwitches = -1;

  char switches = (a << 1) + b;
  if (prevSwitches == -1) {
    prevSwitches = switches;
  }
  char change = changeTable[prevSwitches][switches];
  prevSwitches = switches;
  return change;
}
