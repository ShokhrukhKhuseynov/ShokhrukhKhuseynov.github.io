
export class RecursionDivision {

    constructor(grid) {
        this.grid = grid;
        this.wallsToAnimate = undefined;
    }
    recursiveDivisionMaze(width, height) {

        this.wallsToAnimate = [];
        // Make dimensions odd
        width -= width % 2; width++;
        height -= height % 2; height++;

        var maze = [];
   
        for (var i = 0; i < height; i++) {
            maze.push([]);
     
            for (var j = 0; j < width; j++) {

                maze[i].push((i == 0 || j == 0 || i == height - 1 || j == width - 1) + 0);
                    
                    if (i === 0 || j === 0 || i === height - 1 || j === width - 1) {
                        
                        this.wallsToAnimate.push(this.grid[i][j].id);
                    }

            }
        }

        this.divide(maze, [1, height - 2], [1, width - 2], this.horv(1, 1));

        // maze[0][1] = 0;      enter
        // maze[height - 1][width - 2] = 0; exit

        return maze



    }

    divide(maze, iCoords, jCoords, hv) {

        var iDim = iCoords[1] - iCoords[0];
        var jDim = jCoords[1] - jCoords[0];

        if (iDim <= 0 || jDim <= 0)
            return;

        if (hv == "h") {

            var split;
            do {
                split = Math.floor(Math.random() * (iDim + 1)) + iCoords[0];
            } while (split % 2);

            var hole;
            do {
                hole = Math.floor(Math.random() * (jDim + 1)) + jCoords[0];
            } while (!(hole % 2));

            for (var j = jCoords[0]; j <= jCoords[1]; j++) {
                if (j != hole) {
                    maze[split][j] = 1;
                    this.wallsToAnimate.push(this.grid[split][j].id);
                }
            }

            this.divide(maze,
                [iCoords[0], split - 1],
                jCoords,
                this.horv(split - iCoords[0] - 1, jDim));

            this.divide(maze,
                [split + 1, iCoords[1]],
                jCoords,
                this.horv(iCoords[1] - split - 1, jDim));

        }

        else {

            var split;
            do {
                split = Math.floor(Math.random() * (jDim + 1)) + jCoords[0];
            } while (split % 2);

            var hole;
            do {
                hole = Math.floor(Math.random() * (iDim + 1)) + iCoords[0];
            } while (!(hole % 2));

            for (var i = iCoords[0]; i <= iCoords[1]; i++) {
                if (i != hole) {
                    maze[i][split] = 1;
                    this.wallsToAnimate.push(this.grid[i][split].id);
                }
            }

            this.divide(maze,
                iCoords,
                [jCoords[0], split - 1],
                this.horv(iDim, split - jCoords[0] - 1));
            this.divide(maze,
                iCoords,
                [split + 1, jCoords[1]],
                this.horv(jCoords[0] - split - 1));

        }

    }

    horv(iDim, jDim) {

        if (iDim < jDim)
            return "v";
        else if (jDim < iDim)
            return "h";
        else
            return Math.floor(Math.random() * 2) ? "h" : "v";
    }
}

export class Bin {

    constructor() { };

    recursiveDivisionMaze(width, height) {

        // Make dimensions odd
        width -= width % 2; width++;
        height -= height % 2; height++;

        var maze = [];

        for (var i = 0; i < height; i++) {
            maze.push([]);
            for (var j = 0; j < width; j++) {
                maze[i].push((i == 0 ||
                    j == 0 ||
                    i == height - 1 ||
                    j == width - 1) + 0);
            }
        }

        this.divide(maze, [1, height - 2], [1, width - 2], this.horv(1, 1));

        maze[0][1] = 0;
        maze[height - 1][width - 2] = 0;

        return maze;

    }

    divide(maze, iCoords, jCoords, hv) {
        var iDim = iCoords[1] - iCoords[0];
        var jDim = jCoords[1] - jCoords[0];

        if (iDim <= 0 || jDim <= 0)
            return;

        if (hv == "h") {

            var split;
            do {
                split = Math.floor(Math.random() * (iDim + 1)) + iCoords[0];
            } while (split % 2);

            var hole;
            do {
                hole = Math.floor(Math.random() * (jDim + 1)) + jCoords[0];
            } while (!(hole % 2));

            for (var j = jCoords[0]; j <= jCoords[1]; j++) {
                if (j != hole)
                    maze[split][j] = 1;
            }

            this.divide(maze,
                [iCoords[0], split - 1],
                jCoords,
                this.horv(split - iCoords[0] - 1, jDim));

            this.divide(maze,
                [split + 1, iCoords[1]],
                jCoords,
                this.horv(iCoords[1] - split - 1, jDim));

        }

        else {

            var split;
            do {
                split = Math.floor(Math.random() * (jDim + 1)) + jCoords[0];
            } while (split % 2);

            var hole;
            do {
                hole = Math.floor(Math.random() * (iDim + 1)) + iCoords[0];
            } while (!(hole % 2));

            for (var i = iCoords[0]; i <= iCoords[1]; i++) {
                if (i != hole) {
                    maze[i][split] = 1;
                }
            }

            this.divide(maze,
                iCoords,
                [jCoords[0], split - 1],
                this.horv(iDim, split - jCoords[0] - 1));
            this.divide(maze,
                iCoords,
                [split + 1, jCoords[1]],
                this.horv(jCoords[0] - split - 1));

        }

    }

    horv(iDim, jDim) {

        if (iDim < jDim)
            return "v";
        else if (jDim < iDim)
            return "h";
        else
            return Math.floor(Math.random() * 2) ? "h" : "v";
    }

}
