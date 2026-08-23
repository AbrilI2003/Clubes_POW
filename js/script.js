window.onload = function() {
    // Canvas simple
    /*
    const canvas = document.getElementById("miCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        // Fondo degradado
        const gradiente = ctx.createLinearGradient(0, 0, 400, 0);
        gradiente.addColorStop(0, "#3498db");
        gradiente.addColorStop(1, "#2ecc71");
        ctx.fillStyle = gradiente;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Texto
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("¡Hola desde Canvas!", 80, 100);
    }
    */


/*    
const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2
  });
}

let angle = 0;

function drawStars() {
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPlanet() {
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;
  let orbitRadius = 150;
  let planetX = centerX + orbitRadius * Math.cos(angle);
  let planetY = centerY + orbitRadius * Math.sin(angle);

  // Sol
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
  ctx.fill();

  // Planeta
  ctx.beginPath();
  ctx.fillStyle = "deepskyblue";
  ctx.arc(planetX, planetY, 20, 0, Math.PI * 2);
  ctx.fill();

  angle += 0.01;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawPlanet();
  requestAnimationFrame(animate);
}

animate();
*/

/*
const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width/2, y: canvas.height/2 };

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${Math.random()*360}, 80%, 60%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.05;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles = [];

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].size <= 0.3) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.fillStyle = "rgba(17,17,17,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.push(new Particle(mouse.x, mouse.y));
  handleParticles();
  requestAnimationFrame(animate);
}

animate();
*/

const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 3;
let dy = -3;

let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width-paddleWidth)/2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 5;
let brickColumnCount = 8;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(let r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x:0, y:0, status:1 };
  }
}

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

function collisionDetection() {
  for(let c=0; c<brickColumnCount; c++) {
    for(let r=0; r<brickRowCount; r++) {
      let b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#00ffcc";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#ffcc00";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(let c=0; c<brickColumnCount; c++) {
    for(let r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#ff4444";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      document.location.reload();
    }
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();

};
