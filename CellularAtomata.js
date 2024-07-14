function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let w = 10;
let cols, rows;
let below, above, left, right, belowLeft, belowRight, aboveLeft, aboveRight;
let selectedElement;
let rdn = 10;
let brushSize = 1;

function setup() {
  createCanvas(600, 550);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      grid[i][j] = 1;
    }
  }

  //grid[5][10] = 2;
  //grid[10][54] = 3;
}

function mouseDragged() {
  let col = floor(mouseX / w);
  let row = floor(mouseY / w);
  for (let i = 0; i < brushSize; i = i + 2) {
    for (let j = 0; j < brushSize; j++) {
      grid[col + i - int(brushSize / 2) - (int(j / 2) - j / 2) * 2][row + j] =
        selectedElement;
    }
  }
}

function keyPressed() {
  if (key === "1" || key === "2" || key === "3" || key === "4" || key === "5") {
    selectedElement = int(key);
  }
  if (key === "+") {
    brushSize += 2;
  }
  if (key === "-") {
    brushSize -= 2;
  }
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] === 1) {
        fill(
          160 + sin(i * j + (j - i) * j - i * 15) * 10,
          70 + sin(i * j + (j - i) * j - i * 15) * 10,
          0 + sin(i * j + (j - i) * j - i * 15) * 10
        );
      } else if (grid[i][j] === 2) {
        fill(
          250 + sin(i * j + (j - i) * j - i * 16) * 10,
          185 + sin(i * j + (j - i) * j - i * 16) * 10,
          60 + sin(i * j + (j - i) * j - i * 16) * 10
        );
      } else if (grid[i][j] === 3) {
        r = Math.random() * rdn;
        fill(250 + r, 10 + r, 10 + r);
      } else if (grid[i][j] === 4) {
        r = Math.random() * rdn;
        fill(200 + r, 200 + r, 200 + r);
      } else if (grid[i][j] === 5) {
        fill(
          175 + sin(i * j + (j - i) * j - i * 17) * 10,
          175 + sin(i * j + (j - i) * j - i * 17) * 10,
          175 + sin(i * j + (j - i) * j - i * 17) * 10
        );
      } else {
        fill(0);
      }
      let x = i * w;
      let y = j * w;
      square(x, y, w);
    }
  }

  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Wood behaviour
      if (state === 1 && !(nextGrid[i][j] === 3)) {
        nextGrid[i][j] = 1;
      }
      // Sand behaviour
      if (state === 2) {
        below = grid[i][j + 1];
        if (!(i === 0)) {
          belowLeft = grid[i - 1][j + 1];
        } else {
          belowLeft = -1;
        }
        if (!(i === cols - 1)) {
          belowRight = grid[i + 1][j + 1];
        } else {
          belowRight = -1;
        }
        if (below === 0 || below === 4) {
          nextGrid[i][j + 1] = 2;
        } else if (belowLeft === 0 && belowRight === 0) {
          if (Math.random() < 0.5) {
            nextGrid[i - 1][j + 1] = 2;
          } else {
            nextGrid[i + 1][j + 1] = 2;
          }
        } else if (belowLeft === 0) {
          nextGrid[i - 1][j + 1] = 2;
        } else if (belowRight === 0) {
          nextGrid[i + 1][j + 1] = 2;
        } else if (belowLeft === -1) {
          nextGrid[i][j] = 0;
        } else if (belowRight === -1) {
          nextGrid[i][j] = 0;
        } else if (below === 2 || below === 1 || below === 5) {
          nextGrid[i][j] = 2;
        } else {
          nextGrid[i][j] = 0;
        }
      }
      // fire behaviour
      if (state === 3) {
        above = grid[i][j - 1];
        below = grid[i][j + 1];
        if (!(i === 0)) {
          Left = grid[i - 1][j];
        } else {
          Left = -1;
        }
        if (!(i === cols - 1)) {
          Right = grid[i + 1][j];
        } else {
          Right = -1;
        }
        if (above === 1) {
          nextGrid[i][j - 1] = 3;
        }
        if (Left === 1) {
          nextGrid[i - 1][j] = 3;
        }
        if (Right === 1) {
          nextGrid[i + 1][j] = 3;
        }
        if (below === 1) {
          nextGrid[i][j + 1] = 3;
        }
        nextGrid[i][j] = 4;
      }
      // Smoke behaviour
      if (state === 4) {
        if (!(j === 0)) {
          above = grid[i][j - 1];
        } else {
          above = -1;
        }
        if (!(i === 0)) {
          aboveLeft = grid[i - 1][j - 1];
        } else {
          aboveLeft = -1;
        }
        if (!(i === cols - 1)) {
          aboveRight = grid[i + 1][j - 1];
        } else {
          aboveRight = -1;
        }
        if (!(i === 0)) {
          Left = grid[i - 1][j];
        } else {
          Left = -1;
        }
        if (!(i === cols - 1)) {
          Right = grid[i + 1][j];
        } else {
          Right = -1;
        }
        if (above === 0 || above === 2) {
          nextGrid[i][j - 1] = 4;
        } else if (above === -1) {
          nextGrid[i][j] = 0;
        } else if (aboveLeft === 0 && aboveRight === 0) {
          if (Math.random() < 0.5) {
            nextGrid[i - 1][j - 1] = 4;
          } else {
            nextGrid[i + 1][j - 1] = 4;
          }
        } else if (aboveLeft === 0) {
          nextGrid[i - 1][j - 1] = 4;
        } else if (aboveRight === 0) {
          nextGrid[i + 1][j - 1] = 4;
        } else if (aboveLeft === -1) {
          nextGrid[i][j] = 0;
        } else if (aboveRight === -1) {
          nextGrid[i][j] = 0;
        } /*else if (Left === 0 && Right === 0) {
          if (Math.random() < 0.5) {
            nextGrid[i - 1][j] = 4;
          } else {
            nextGrid[i + 1][j] = 4;
          }
        } else if (Left === 0) {
          nextGrid[i - 1][j] = 4;
        }*/ else if (Right === 0) {
          nextGrid[i + 1][j] = 4;
        } else {
          nextGrid[i][j] = 4;
        }
      }
      //Stone behavior
      if (state === 5) {
        nextGrid[i][j] = 5;
      }
    }
  }
  grid = nextGrid;
  //grid[5][10] = 2;
}
