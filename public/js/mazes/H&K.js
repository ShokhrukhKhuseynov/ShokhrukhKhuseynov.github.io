export class HandK {

    constructor(grid) {
        this.grid = grid;
        this.unvisitedToAnimate = undefined;
    }
    huntAndKillMaze(width, height) {
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

        maze[0][1] = 0;
        maze[1][1] = 0;

        var on = [1, 1];

        while (!this.complete(maze)) {

            var n = this.neighbors(maze, on[0], on[1]);
            if (n.length == 0) {
                var t = this.findCoord(maze);
                on = t[0];

                maze[on[0]][on[1]] = 0;
                maze[(on[0] + t[1][0]) / 2][(on[1] + t[1][1]) / 2] = 0;
                this.unvisitedToAnimate.push(this.grid[on[0]][on[1]].id);
                this.unvisitedToAnimate.push(this.grid[(on[0] + t[1][0]) / 2][(on[1] + t[1][1]) / 2].id);
            }

            else {

                var i = Math.floor(Math.random() * n.length);
                var nb = n[i];
                maze[nb[0]][nb[1]] = 0;
                maze[(nb[0] + on[0]) / 2][(nb[1] + on[1]) / 2] = 0;

                this.unvisitedToAnimate.push(this.grid[nb[0]][nb[1]].id);
                this.unvisitedToAnimate.push(this.grid[(nb[0] + on[0]) / 2][(nb[1] + on[1]) / 2].id);
                on = nb.slice();

            }

        }

        maze[height - 2][width - 1] = 0;

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

    neighborsAB(maze, ic, jc) {
        var final = [];
        for (var i = 0; i < 4; i++) {
            var n = [ic, jc];

            n[i % 2] += ((Math.floor(i / 2) * 2) || -2);
            if (n[0] < maze.length &&
                n[1] < maze[0].length &&
                n[0] > 0 &&
                n[1] > 0) {

                final.push(n);
            }
        }
        return final;
    }

    complete(maze) {
        for (var i = 1; i < maze.length; i += 2) {
            for (var j = 1; j < maze[0].length; j += 2) {
                if (maze[i][j] != 0)
                    return false;
            }
        }
        return true;
    }

    findCoord(maze) {
        for (var i = 1; i < maze.length; i += 2) {
            for (var j = 1; j < maze[0].length; j += 2) {

                if (maze[i][j] == 1) {
                    var n = this.neighborsAB(maze, i, j);

                    for (var k = 0; k < n.length; k++) {
                        if (maze[n[k][0]][n[k][1]] == 0)
                            return [[i, j], n[k]];
                    }
                }

            }
        }
    }

}

