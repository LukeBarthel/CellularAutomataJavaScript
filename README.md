# CellularAutomataJavaScript

This is a simple Cellular Automata simulation in Java Script. It was coded using the P5 library, wich you can download in most coding environments, or use the online editor at "https://editor.p5js.org". 

![image](https://github.com/user-attachments/assets/8021a51c-59cf-42ab-adfa-a84007244052)

## 1. Initialization:

- make2DArray(cols, rows): Creates a 2D array with specified columns and rows, initialized with zeros.
- let grid;: Declares the grid to hold the cellular automaton.
- let w = 10;: Defines the width of each cell.
- let cols, rows;: Variables to store the number of columns and rows based on the canvas size.
- Various other variables are declared for the state of cells and the brush size.

## 2. Setup Function:

### setup():
Initializes the canvas and the grid. The canvas size is set to 600x550, and the grid is initialized with cells having the state 1.
## 3. Mouse Interaction:

### mouseDragged():
Allows the user to draw on the grid by dragging the mouse. The cells under the mouse pointer are set to the selectedElement state.
## 4. Keyboard Interaction:

### keyPressed():
Changes the selectedElement based on number keys pressed (1-5). It also adjusts the brush size with + and - keys.
## 5. Drawing the Grid:

### draw():
This function updates the canvas continuously. It fills the cells with different colors based on their states and applies rules to update the states for the next generation.

## 6. State Update Rules:

- The grid updates according to specific rules:
- Wood (state === 1): Maintains its state unless affected by fire.
- Sand (state === 2): Falls down or slides diagonally if there is empty space or smoke below.
- Fire (state === 3): Spreads to adjacent wood cells and then turns to smoke.
- Smoke (state === 4): Rises or spreads laterally if there is space or sand above.
- Stone (state === 5): Remains stationary.
