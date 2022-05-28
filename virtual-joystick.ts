class VirtualJoystick {

    id: string;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    initX: number;
    initY: number;
    outerColer: string;
    innerColer: string;
    OUTER_CIRCLE_SIZE: number;
    OUTER_INNER_DIFFERENCE: number;
    INNER_CIRCLE_SIZE: number;

    constructor (x: number , y: number = 0.1, id: string = 'canvas', size: number = 100, outercoler: string = "#86350b", innercoler: string =  "#c34806"){
        this.id = id
        this.canvas = null;
        this.ctx = null;
        this.initX = x;
        this.initY = y;
        this.outerColer = outercoler;
        this.innerColer = innercoler;
        this.OUTER_CIRCLE_SIZE = size;
        this.OUTER_INNER_DIFFERENCE = this.OUTER_CIRCLE_SIZE / 2;
        this.INNER_CIRCLE_SIZE = this.OUTER_CIRCLE_SIZE - this.OUTER_INNER_DIFFERENCE;
    };

    create = () => {
        if (document.getElementById(this.id) == null) {
            let zoomLevel = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
            let canvasDOM: HTMLCanvasElement = document.createElement("canvas");
            canvasDOM.id = this.id;
            canvasDOM.width = Math.floor(screen.width * 1/zoomLevel);
            canvasDOM.height = Math.floor(screen.height * 1/zoomLevel);
            canvasDOM.style.left = "0";
            canvasDOM.style.margin = "auto";
            canvasDOM.style.position = "absolute";
            let wrapper = document.getElementById("wrapper");
            wrapper.appendChild(canvasDOM);
        
            this.setCanvas();
        } else {
            console.log("%c%s%c is already created", "color:red;", this.id, "")
        }
    };

    delete = () => {
        let wrapper = document.getElementById('wrapper');
        let canvas = document.getElementById(this.id);
        if (canvas) {
          wrapper.removeChild(canvas)
        }
      }
    
    setCanvas = () => {
        this.canvas = document.getElementById(this.id) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
    }

    readCoordinate = () => {
        let coordinate = 
            {"initX": this.initX,
            "initY": this.initY}
        
        return(coordinate);
    }
    
    drawOuterCircle = (ox, oy, ocs) => {
        this.ctx.beginPath();
        this.ctx.arc(ox, oy, ocs, 0, Math.PI*2, false);
        this.ctx.fillStyle = this.outerColer;
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    drawBall = (x, y, cs) => {
        this.ctx.beginPath();
        this.ctx.arc(x, y, cs, 0, Math.PI*2);
        this.ctx.fillStyle = this.innerColer;
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    draw = (x, y = 0)  => {
        let ballX = this.canvas.width * this.initX + this.INNER_CIRCLE_SIZE * x;
        let ballY = this.canvas.height * this.initY + this.INNER_CIRCLE_SIZE * y;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawOuterCircle(this.canvas.width * this.initX, this.canvas.height * this.initY, this.OUTER_CIRCLE_SIZE);
        this.drawBall(ballX, ballY, this.INNER_CIRCLE_SIZE);
    }
}

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