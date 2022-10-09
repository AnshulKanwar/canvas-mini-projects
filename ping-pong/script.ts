const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const clamp = (x: number, min: number, max: number): number => {
  if (x < min) return min;
  else if (x > max) return max;
  return x;
};

const isColliding = (ball: Ball, player: Player): boolean => {
  if (
    ball.x > player.x - player.width / 2 &&
    ball.x < player.x + player.width / 2
  )
    if (Math.abs(ball.y - player.y) <= ball.radius + player.height / 2) {
      return true;
    }
  return false;
};

const isGameOver = (ball: Ball): boolean => {
  if (ball.y + ball.radius >= canvas.height) {
    return true;
  } else return false;
};

const gameOverUI = () => {
  ctx.font = "48px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Game Over 😭", canvas.width / 2, canvas.height / 2);
};

class Player {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x = canvas.width / 2) {
    this.x = x;
    this.y = canvas.height - 10;

    this.width = 200;
    this.height = 20;

    window.addEventListener("mousemove", (e) => this.update(e));
  }

  update(e: MouseEvent) {
    this.x = clamp(e.clientX, this.width / 2, canvas.width - this.width / 2);
  }

  draw() {
    this.y = canvas.height - 10;
    ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height,
      this.width,
      this.height
    );
  }
}

class Ball {
  radius: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;

  constructor(
    x = Math.random() * canvas.width,
    y = Math.random() * canvas.height,
    velocityX = 0.3,
    velocityY = -0.3
  ) {
    this.radius = 15;
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  update(timeDelta: number, player: Player) {
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

  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const player = new Player();
const ball = new Ball();

let previousTimestamp = 0;
let timeDelta: number;

const draw = (timestamp: number) => {
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
