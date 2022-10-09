var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var Ball = /** @class */ (function () {
    function Ball(x, y, velocityX, velocityY) {
        if (x === void 0) { x = Math.random() * canvas.width; }
        if (y === void 0) { y = Math.random() * canvas.height; }
        if (velocityX === void 0) { velocityX = Math.random() * 2 - 1; }
        if (velocityY === void 0) { velocityY = Math.random() * 2 - 1; }
        this.radius = 10;
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }
    Ball.prototype.update = function (timeDelta) {
        this.x += this.velocityX * timeDelta;
        this.y += this.velocityY * timeDelta;
        if (this.x < 0 || this.x > canvas.width) {
            this.velocityX = -this.velocityX;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.velocityY = -this.velocityY;
        }
    };
    Ball.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    };
    return Ball;
}());
var clear = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
var balls = [];
canvas.addEventListener("click", function (e) {
    console.log("clicked");
    var ball = new Ball(e.clientX, e.clientY);
    balls.push(ball);
});
var previousTimeStamp = 0;
var render = function (timestamp) {
    var timeDelta = timestamp - previousTimeStamp;
    if (previousTimeStamp != timestamp) {
        clear();
        balls.map(function (ball) {
            ball.update(timeDelta);
            ball.draw();
        });
    }
    previousTimeStamp = timestamp;
    requestAnimationFrame(render);
};
window.requestAnimationFrame(render);
