"use strict";
exports.__esModule = true;
var virtual_joystick_1 = require("./virtual-joystick");
var LeftJoystick = new virtual_joystick_1.VirtualJoystick(0.1, 0.9, 'left', 100);
LeftJoystick.create();
var RightJoystick = new virtual_joystick_1.VirtualJoystick(0.5, 0.9, 'right', 100);
RightJoystick.create();
var initLeftCoodinate = LeftJoystick.readCoordinate();
var innerLeftX = 0;
var innerLeftY = 0;
var initRightCoodinate = RightJoystick.readCoordinate();
var innerRightX = 0;
var innerRightY = 0;
document.addEventListener('keydown', function (event) {
    var key = event.key;
    if (key === 'a') {
        innerLeftX = -1;
    }
    else if (key === 's') {
        innerLeftY = 1;
    }
    else if (key === 'd') {
        innerLeftX = 1;
    }
    else if (key === 'w') {
        innerLeftY = -1;
    }
    else if (key === 'j') {
        innerRightX = -1;
    }
    else if (key === 'k') {
        innerRightY = 1;
    }
    else if (key === 'l') {
        innerRightX = 1;
    }
    else if (key === 'i') {
        innerRightY = -1;
    }
    else if (key === 'Escape') {
        LeftJoystick["delete"]();
        RightJoystick["delete"]();
    }
    else if (key === " ") {
        LeftJoystick.create();
        RightJoystick.create();
    }
    else {
        console.log(key);
    }
}, false);
document.addEventListener('keyup', function (event) {
    var key = event.key;
    if (key === 'a' || key === 'd') {
        innerLeftX = 0;
    }
    else if (key === 's' || key === 'w') {
        innerLeftY = 0;
    }
    else if (key === 'j' || key === 'l') {
        innerRightX = 0;
    }
    else if (key === 'k' || key === 'i') {
        innerRightY = 0;
    }
}, false);
setInterval(function () {
    LeftJoystick.draw(innerLeftX, innerLeftY);
    RightJoystick.draw(innerRightX, innerRightY);
}, 10);
