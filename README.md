# marching-squares
marching squares algorithm implemented in JavaScript using p5js library

The marching squares algorithm is a contour genrating algorithm for 2D rectangular field of numerical values...

-The Steps:

```
// the marchin squares algorithm is a countour generating algorithm for a two-dimensional
// scalar field, i.e., recatngular array of scalar values.

// the algorithm:
//      [ ] process each cell in the grid independantly
//      [ ] calculate a cell value for each cell using the cell contours
//      [ ] using a look-up table to make geometry of the contours(to draw isolines)
```

-The algorithm:

```
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
```

-The generation of the rectangular numerical field.

```
    xoff = 0;
    for (let i = 0; i < grid.length; i++) {
        xoff += increment;
        yoff = 0;
        for (let j = 0; j < grid[0].length; j++) {
            yoff += increment;
            grid[i][j] = noise(xoff, yoff);
        }
    }
```

