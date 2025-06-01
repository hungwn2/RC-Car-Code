#include <Arduino.h>

// put function declarations here:
int myFunction(int, int);

const int IN1=18;
const int IN2=19;
const int ENA=23;

const int IN3=16;
const int IN4=17;
const int ENB=22;

const int ENA_CHANNEL=0;
const int ENB_CHANNEL=1;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

ledcSetup(ENA_CHANNEL, 5000, 8);  
ledcAttachPin(ENA, ENA_CHANNEL);

ledcSetup(ENB_CHANNEL, 5000, 8);  
ledcAttachPin(ENB, ENB_CHANNEL);

Serial.println("Motor controller ready");

}

void moveForward(int speed){
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);

  ledcWrite(ENA_CHANNEL, speed);
  ledcWrite(ENB_CHANNEL, speed);
}
void moveBackward(int speed) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);

  ledcWrite(ENA_CHANNEL, speed);
  ledcWrite(ENB_CHANNEL, speed);
}

void turnLeft(int speed) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);

  ledcWrite(ENA_CHANNEL, 0);
  ledcWrite(ENB_CHANNEL, speed);
}

void turnRight(int speed) {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);

  ledcWrite(ENA_CHANNEL, speed);
  ledcWrite(ENB_CHANNEL, 0);
}

void stopMotors() {
  ledcWrite(ENA_CHANNEL, 0);
  ledcWrite(ENB_CHANNEL, 0);
}

void loop() {
  moveForward(180); delay(2000);
  turnLeft(180);    delay(1000);
  moveBackward(150);delay(2000);
  stopMotors();     delay(1000);
}