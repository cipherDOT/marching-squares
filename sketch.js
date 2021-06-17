// the marchin squares algorithm is a countour generating algorithm for a two-dimensional
// scalar field, i.e., recatngular array of scalar values.

// the algorithm:
//      [ ] process each cell in the grid independantly
//      [ ] calculate a cell value for each cell using the cell contours
//      [ ] using a look-up table to make geometry of the contours(to draw isolines)

let grid;
let rez = 10;
let xoff = 0;
let yoff = 0;
let increment = 0.05;

// ---------------------------------------2D array function----------------------------------------------- //
function t_array(cols, rows) {
    let array = new Array(cols);
    for (let i = 0; i < cols; i++) {
        array[i] = new Array(rows);
    }

    return array;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    let cols = int(width / rez) + 1;
    let rows = int(height / rez) + 1;
    grid = t_array(cols, rows);
}

// ---------------------------------------drawing Isolines----------------------------------------------- //
function isoline(a, b) {
    line(a[0], a[1], b[0], b[1]);
}

// ---------------------------------------State of a point----------------------------------------------- //
function getState(a, b, c, d) {
    return a * 8 + b * 4 + c * 2 + d * 1;
}

function draw() {
    background(0);
    strokeWeight(rez * 0.4);
    // --------------------making a 2D grid of noise values--------------------------- //
    xoff = 0;
    for (let i = 0; i < grid.length; i++) {
        xoff += increment;
        yoff = 0;
        for (let j = 0; j < grid[0].length; j++) {
            yoff += increment;
            grid[i][j] = noise(xoff, yoff);
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            let n = grid[i][j];

            stroke(n * 255);
            point(i * rez, j * rez);
        }
    }

    strokeWeight(rez * 0.1);
    stroke(220);

    // --------------------the marching squares algorithm--------------------------- //
    for (let i = 0; i < grid.length - 1; i++) {
        for (let j = 0; j < grid[0].length - 1; j++) {
            let x = i * rez;
            let y = j * rez;

            let a = [x + rez / 2, y];
            let b = [x + rez, y + rez / 2];
            let c = [x + rez / 2, y + rez];
            let d = [x, y + rez / 2];

            let state = getState(
                round(grid[i][j]),
                round(grid[i + 1][j]),
                round(grid[i + 1][j + 1]),
                round(grid[i][j + 1])
            );

            // switch cases for specific values of get state.
            switch (state) {
                case 0:
                    null;
                    break;
                case 1:
                    isoline(c, d);
                    print("case 1 boiiii");
                    break;
                case 2:
                    isoline(b, c);
                    break;
                case 3:
                    isoline(b, d);
                    break;
                case 4:
                    isoline(a, b);
                    break;
                case 5:
                    isoline(a, d);
                    isoline(b, c);
                    break;
                case 6:
                    isoline(a, c);
                    break;
                case 7:
                    isoline(a, d);
                    break;
                case 8:
                    isoline(a, d);
                    break;
                case 9:
                    isoline(a, c);
                    break;
                case 10:
                    isoline(a, b);
                    isoline(c, d);
                    break;
                case 11:
                    isoline(a, b);
                    break;
                case 12:
                    isoline(b, d);
                    break;
                case 13:
                    isoline(b, c);
                    break;
                case 14:
                    isoline(c, d);
                    break;
                case 15:
                    null;
            }
        }
    }
    noLoop();
}
