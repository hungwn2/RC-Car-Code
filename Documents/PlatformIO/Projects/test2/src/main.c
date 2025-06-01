#include <WiFi.h>
#include <WebServer.h>
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);
RF24 radio(4, 5);  // CE, CSN

const byte address[6] = "1Node";

struct CommandPacket {
  char command[10];
};

// Web page
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Car Controller</title>
<style>
body { font-family:sans-serif; text-align:center; background:#e0f7fa; margin:0; padding:0; }
.controller { width:320px; margin:50px auto; background:#fff; border:2px solid #00acc1; border-radius:15px; padding:20px; }
button { width:60px; height:60px; margin:5px; font-size:20px; border-radius:10px; border:none; background:#00acc1; color:white; }
button:active { background:#007c91; }
.speed-buttons button { width:50px; height:50px; font-size:16px; background:#00796b; }
</style></head>
<body>
<div class="controller">
  <div><button onclick="send('up')">↑</button></div>
  <div>
    <button onclick="send('left')">←</button>
    <button onclick="send('stop')">⏹</button>
    <button onclick="send('right')">→</button>
  </div>
  <div><button onclick="send('down')">↓</button></div>
  <div class="speed-buttons">
    <button onclick="send('speed1')">1</button>
    <button onclick="send('speed2')">2</button>
    <button onclick="send('speed3')">3</button>
    <button onclick="send('speed4')">4</button>
    <button onclick="send('speed5')">5</button>
  </div>
</div>
<script>
  function send(command) {
    fetch("/cmd?key=" + command);
  }
</script>
</body></html>
)rawliteral";

// Send NRF packet
void sendCommandOverNRF(String cmd) {
  CommandPacket packet;
  memset(&packet, 0, sizeof(packet));
  cmd.toCharArray(packet.command, sizeof(packet.command));
  radio.write(&packet, sizeof(packet));
}

void handleRoot() {
  server.send(200, "text/html", index_html);
}

void setup() {
  Serial.begin(115200);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("\nWiFi connected: " + WiFi.localIP().toString());

  // nRF24 setup
  if (!radio.begin()) {
    Serial.println("nRF24L01 not found!");
    while (1);
  }
  radio.setPALevel(RF24_PA_LOW);
  radio.setDataRate(RF24_250KBPS);
  radio.openWritingPipe(address);
  radio.stopListening();

  // Web server routes
  server.on("/", handleRoot);
  server.on("/cmd", []() {
    String key = server.arg("key");
    Serial.println("Command: " + key);
    sendCommandOverNRF(key);
    server.send(200, "text/plain", "OK");
  });

  server.begin();
}

void loop() {
  server.handleClient();
}

