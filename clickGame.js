const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let gameIsOver = false;

let lives = 1;

class Block {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y
    }
    this.width = 100
    this.height = 100
  }

  draw() {
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.position.x &&
      mouseX <= this.position.x + this.width &&
      mouseY >= this.position.y &&
      mouseY <= this.position.y + this.height
    );
  }
}

const blocks = [];

function generateBlock() {
  const randomX = Math.floor(Math.random() * (canvas.width - 100));
  const randomY = Math.floor(Math.random() * (canvas.height - 100));
  const block = new Block(randomX, randomY);

  blocks.push(block);

  canvas.addEventListener('click', function(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    blocks.forEach((block, index) => {
      if (block.isClicked(mouseX, mouseY)) {
        blocks.splice(index, 1);
        c.clearRect(0, 0, canvas.width, canvas.height);
        blocks.forEach(block => block.draw());
      }
    });
  });
  block.draw();
}

for (let i = 0; i < 10; i++) {
  generateBlock();
}

function startTimer(duration, display) {
  var timer = duration
  let seconds;
  let intervalId;

  function resetTimer() {
    clearInterval(intervalId);
    timer = duration;
    intervalId = startTimer(duration, display);
  }

  intervalId = setInterval(function() {
    seconds = parseInt(timer % 60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = seconds;

    if (timer === 0) {
      if (blocks.length > 0 && !gameIsOver) {
        gameIsOver = true;

        clearInterval(intervalId);

        c.clearRect(0, 0, canvas.width, canvas.height);
        c.font = "60px Arial";
        c.fillStyle = "red";
        c.fillText("Game Over", canvas.width/2 - 150, canvas.height/2);
        lives = lives - 1;
        document.querySelector('#lives').textContent = lives;   
      }
    }
  
    timer--;
  }, 1000);
  return intervalId;
}

window.onload = function() {
  const sixSeconds = 6;
  const display = document.querySelector('#time');
  startTimer(sixSeconds, display);
  const threeLives = 1;
  document.querySelector('#lives').textContent = threeLives;
};
