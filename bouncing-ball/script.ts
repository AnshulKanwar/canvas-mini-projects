const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Ball {
  radius: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;

  constructor(
    x = Math.random() * canvas.width,
    y = Math.random() * canvas.height,
    velocityX = Math.random() * 2 - 1,
    velocityY = Math.random() * 2 - 1
  ) {
    this.radius = 10;
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  update(timeDelta: number) {
    this.x += this.velocityX * timeDelta;
    this.y += this.velocityY * timeDelta;

    if (this.x < 0 || this.x > canvas.width) {
      this.velocityX = -this.velocityX;
    }
    if (this.y < 0 || this.y > canvas.height) {
      this.velocityY = -this.velocityY;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const balls: Ball[] = [];

canvas.addEventListener("click", (e) => {
  console.log("clicked");
  const ball = new Ball(e.clientX, e.clientY);
  balls.push(ball);
});

let previousTimeStamp = 0;

const render = (timestamp: number) => {
  let timeDelta = timestamp - previousTimeStamp;

  if (previousTimeStamp != timestamp) {
    clear();
    balls.map((ball) => {
      ball.update(timeDelta);
      ball.draw();
    });
  }

  previousTimeStamp = timestamp;
  requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
