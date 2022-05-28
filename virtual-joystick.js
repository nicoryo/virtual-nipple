var VirtualJoystick = /** @class */ (function () {
    function VirtualJoystick(x, y, id, size, outercoler, innercoler) {
        var _this = this;
        if (y === void 0) { y = 0.1; }
        if (id === void 0) { id = 'canvas'; }
        if (size === void 0) { size = 100; }
        if (outercoler === void 0) { outercoler = "#86350b"; }
        if (innercoler === void 0) { innercoler = "#c34806"; }
        this.create = function () {
            if (document.getElementById(_this.id) == null) {
                var zoomLevel = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
                var canvasDOM = document.createElement("canvas");
                canvasDOM.id = _this.id;
                canvasDOM.width = Math.floor(screen.width * 1 / zoomLevel);
                canvasDOM.height = Math.floor(screen.height * 1 / zoomLevel);
                canvasDOM.style.left = "0";
                canvasDOM.style.margin = "auto";
                canvasDOM.style.position = "absolute";
                var wrapper = document.getElementById("wrapper");
                wrapper.appendChild(canvasDOM);
                _this.setCanvas();
            }
            else {
                console.log("%c%s%c is already created", "color:red;", _this.id, "");
            }
        };
        this["delete"] = function () {
            var wrapper = document.getElementById('wrapper');
            var canvas = document.getElementById(_this.id);
            if (canvas) {
                wrapper.removeChild(canvas);
            }
        };
        this.setCanvas = function () {
            _this.canvas = document.getElementById(_this.id);
            _this.ctx = _this.canvas.getContext("2d");
        };
        this.readCoordinate = function () {
            var coordinate = { "initX": _this.initX,
                "initY": _this.initY };
            return (coordinate);
        };
        this.drawOuterCircle = function (ox, oy, ocs) {
            _this.ctx.beginPath();
            _this.ctx.arc(ox, oy, ocs, 0, Math.PI * 2, false);
            _this.ctx.fillStyle = _this.outerColer;
            _this.ctx.fill();
            _this.ctx.closePath();
        };
        this.drawBall = function (x, y, cs) {
            _this.ctx.beginPath();
            _this.ctx.arc(x, y, cs, 0, Math.PI * 2);
            _this.ctx.fillStyle = _this.innerColer;
            _this.ctx.fill();
            _this.ctx.closePath();
        };
        this.draw = function (x, y) {
            if (y === void 0) { y = 0; }
            var ballX = _this.canvas.width * _this.initX + _this.INNER_CIRCLE_SIZE * x;
            var ballY = _this.canvas.height * _this.initY + _this.INNER_CIRCLE_SIZE * y;
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.drawOuterCircle(_this.canvas.width * _this.initX, _this.canvas.height * _this.initY, _this.OUTER_CIRCLE_SIZE);
            _this.drawBall(ballX, ballY, _this.INNER_CIRCLE_SIZE);
        };
        this.id = id;
        this.canvas = null;
        this.ctx = null;
        this.initX = x;
        this.initY = y;
        this.outerColer = outercoler;
        this.innerColer = innercoler;
        this.OUTER_CIRCLE_SIZE = size;
        this.OUTER_INNER_DIFFERENCE = this.OUTER_CIRCLE_SIZE / 2;
        this.INNER_CIRCLE_SIZE = this.OUTER_CIRCLE_SIZE - this.OUTER_INNER_DIFFERENCE;
    }
    ;
    return VirtualJoystick;
}());
var LeftJoystick = new VirtualJoystick(0.1, 0.9, 'left', 100);
LeftJoystick.create();
var RightJoystick = new VirtualJoystick(0.5, 0.9, 'right', 100);
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
