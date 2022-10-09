var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
var clear = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
var clamp = function (x, min, max) {
    if (x < min)
        return min;
    else if (x > max)
        return max;
    return x;
};
var isColliding = function (ball, player) {
    if (ball.x > player.x - player.width / 2 &&
        ball.x < player.x + player.width / 2)
        if (Math.abs(ball.y - player.y) <= ball.radius + player.height / 2) {
            return true;
        }
    return false;
};
var isGameOver = function (ball) {
    if (ball.y + ball.radius >= canvas.height) {
        return true;
    }
    else
        return false;
};
var gameOverUI = function () {
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over 😭", canvas.width / 2, canvas.height / 2);
};
var Player = /** @class */ (function () {
    function Player(x) {
        var _this = this;
        if (x === void 0) { x = canvas.width / 2; }
        this.x = x;
        this.y = canvas.height - 10;
        this.width = 200;
        this.height = 20;
        window.addEventListener("mousemove", function (e) { return _this.update(e); });
    }
    Player.prototype.update = function (e) {
        this.x = clamp(e.clientX, this.width / 2, canvas.width - this.width / 2);
    };
    Player.prototype.draw = function () {
        this.y = canvas.height - 10;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height, this.width, this.height);
    };
    return Player;
}());
var Ball = /** @class */ (function () {
    function Ball(x, y, velocityX, velocityY) {
        if (x === void 0) { x = Math.random() * canvas.width; }
        if (y === void 0) { y = Math.random() * canvas.height; }
        if (velocityX === void 0) { velocityX = 0.3; }
        if (velocityY === void 0) { velocityY = -0.3; }
        this.radius = 15;
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }
    Ball.prototype.update = function (timeDelta, player) {
        this.x += this.velocityX * timeDelta;
        this.y += this.velocityY * timeDelta;
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocityX *= -1;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocityY *= -1;
        }
        if (isColliding(this, player)) {
            this.velocityX += (this.x - player.x) / 500;
            this.velocityY *= -1.1;
        }
    };
    Ball.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    };
    return Ball;
}());
var player = new Player();
var ball = new Ball();
var previousTimestamp = 0;
var timeDelta;
var draw = function (timestamp) {
    timeDelta = timestamp - previousTimestamp;
    if (previousTimestamp !== timestamp) {
        if (isGameOver(ball)) {
            gameOverUI();
            return;
        }
        clear();
        player.draw();
        ball.update(timeDelta, player);
        ball.draw();
    }
    previousTimestamp = timestamp;
    window.requestAnimationFrame(draw);
};
window.requestAnimationFrame(draw);
