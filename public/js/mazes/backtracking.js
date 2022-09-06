
export class BacktrackingMaze {

    constructor(grid) {
        this.grid = grid;
        this.unvisitedToAnimate = undefined;
    }

    backtrackingMazeGenerator(width, height) {
        this.unvisitedToAnimate = [];

        width -= width % 2; width++;
        height -= height % 2; height++;

        var maze = [];
        for (var i = 0; i < height; i++) {
            maze.push([]);
            for (var j = 0; j < width; j++) {
                maze[i].push(1);
            }
        }

        var start = [];
        do {
            start[0] = Math.floor(Math.random() * height)
        } while (start[0] % 2 == 0);
        do {
            start[1] = Math.floor(Math.random() * width)
        } while (start[1] % 2 == 0);

        maze[start[0]][start[1]] = 0;

        var openCells = [start];

        while (openCells.length) {

            var cell, n;

            openCells.push([-1, -1]);

            do {
                openCells.pop();
                if (openCells.length == 0)
                    break;
                cell = openCells[openCells.length - 1];
                n = this.neighbors(maze, cell[0], cell[1]);
            } while (n.length == 0 && openCells.length > 0);

            if (openCells.length == 0)
                break;

            var choice = n[Math.floor(Math.random() * n.length)];
            openCells.push(choice);

            maze[choice[0]][choice[1]] = 0;
            maze[(choice[0] + cell[0]) / 2][(choice[1] + cell[1]) / 2] = 0;
            this.unvisitedToAnimate.push(this.grid[choice[0]][choice[1]].id);
            this.unvisitedToAnimate.push(this.grid[(choice[0] + cell[0]) / 2][(choice[1] + cell[1]) / 2].id);
        }

        return maze;
    }

    neighbors(maze, ic, jc) {
        var final = [];
        for (var i = 0; i < 4; i++) {
            var n = [ic, jc];

            n[i % 2] += ((Math.floor(i / 2) * 2) || -2);
            if (n[0] < maze.length &&
                n[1] < maze[0].length &&
                n[0] > 0 &&
                n[1] > 0) {

                if (maze[n[0]][n[1]] == 1) {
                    final.push(n);
                }
            }
        }
        return final;
    }

}