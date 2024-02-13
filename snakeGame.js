const secondCanvas = document.querySelector('canvas');
const secondC = canvas.getContext('2d');

var grid = 40;
var count = 0;

var snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,

  cells: [],

  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;
  secondC.clearRect(0,0,secondCanvas.width,secondCanvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = secondCanvas.width - grid;
  }
  else if (snake.x >= secondCanvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = secondCanvas.height - grid;
  }
  else if (snake.y >= secondCanvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({x: snake.x, y: snake.y});

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  secondC.fillStyle = 'blue';
  secondC.fillRect(apple.x, apple.y, grid-1, grid-1);

  secondC.fillStyle = 'red';
  secondC.cells.forEach(function(cell, index) {

    secondC.fillRect(cell.x, cell.y, grid-1, grid-1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {

      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        

        window.location.href = "http://127.0.0.1:5500/index.html"
      }
    }
  });
}
  
document.addEventListener('keydown', function(e) {
 
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(loop);
