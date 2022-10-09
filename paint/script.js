const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let isPressed = false;
let posX;
let posY;

canvas.addEventListener("mousedown", () => {
  isPressed = true;
  ctx.moveTo(posX, posY);
});

canvas.addEventListener("mouseup", () => {
  isPressed = false;
});

const draw = () => {
  if (!isPressed) return;

  ctx.lineCap = "round"
  ctx.lineWidth = 10
  ctx.lineTo(posX, posY);
  ctx.stroke();
};

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  posX = e.clientX - rect.x;
  posY = e.clientY - rect.y;

  draw();
});
