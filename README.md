# bieber-shooter-game
Use your phone to control the crosshair on your desktop. Shoot Bieber!

# Getting started

1 - Clone the repo
```
git clone git@github.com:joestrong/bieber-shooter-game.git
cd bieber-shooter-game
```
2 - Install dependancies
```
npm install
```
3 - Run the server
```
node server.js
```
4 - You will need to set the IP of the server for socket.io (change 'localhost') at the top of these files:
```
/game/main.js
/mobile/main.js
```
4 - Run the game on your desktop
```
http://localhost:8000/game
```
5 - Run the controller on your mobile (use your server IP instead of localhost)
```
http://localhost:8000/mobile
```

# Usage

Follow the mobile instructions to calibrate. Keep phone stationary in 3D space, but turn the phone to face the corners of your desktop's monitor and press the screen.

After calibration you should be able to control the crosshair by turning the phone to point to the screen (turning, not moving device)
