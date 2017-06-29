#include <Encoder.h>

Encoder myEnc(2, 0);

void setup() {
  pinMode(1, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  pinMode(0, INPUT_PULLUP);
}


long oldPosition  = -999;

void loop() {
  long newPosition = myEnc.read();
  if (newPosition != oldPosition) {
    oldPosition = newPosition;

    analogWrite(1, (int)(newPosition & 1023));
  }
}
