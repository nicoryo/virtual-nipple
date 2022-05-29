import { VirtualJoystick } from './virtual-joystick';

let LeftJoystick = new VirtualJoystick(0.1, 0.9, 'left', 100);
LeftJoystick.create();
let RightJoystick = new VirtualJoystick(0.5, 0.9, 'right', 100);
RightJoystick.create();

let initLeftCoodinate = LeftJoystick.readCoordinate();
let innerLeftX: number = 0;
let innerLeftY: number = 0;

let initRightCoodinate = RightJoystick.readCoordinate();
let innerRightX: number = 0;
let innerRightY: number = 0;

document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === 'a') {
        innerLeftX = -1;
    } else if (key === 's') {
        innerLeftY = 1;
    } else if (key === 'd') {
        innerLeftX = 1;
    } else if (key === 'w') {
        innerLeftY = -1;
    } else if (key === 'j') {
        innerRightX = -1;
    } else if (key === 'k') {
        innerRightY = 1;
    } else if (key === 'l') {
        innerRightX = 1;
    } else if (key === 'i') {
        innerRightY = -1;
    } else if (key === 'Escape') {
        LeftJoystick.delete();
        RightJoystick.delete();
    } else if (key === " ") {
        LeftJoystick.create();
        RightJoystick.create();
    } else {
        console.log(key);
    }
}, false);
document.addEventListener('keyup', (event) => {
    let key = event.key;
    if (key === 'a' || key === 'd' ) {
        innerLeftX = 0;
    } else if (key === 's' || key === 'w') {
        innerLeftY = 0;
    } else if (key === 'j' || key === 'l') {
        innerRightX = 0;
    } else if (key === 'k' || key === 'i') {
        innerRightY = 0;
    }
}, false);
setInterval(function(){
    LeftJoystick.draw(innerLeftX, innerLeftY);
    RightJoystick.draw(innerRightX, innerRightY)
}, 10);
