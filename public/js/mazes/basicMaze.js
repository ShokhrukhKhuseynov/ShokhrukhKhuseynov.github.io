import { changeToWallNode, changeToUnvisitedNode, changeToWeightNode } from "../elementsClassChanger.js";
export function randomBasicMaze(width, height, grid, wall) {

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const randomNumber = Math.floor(Math.random() * 4);
            if (randomNumber === 1) {
                if (wall) {
                    changeToWallNode(grid[i][j].id);
                } else{
                    changeToWeightNode(grid[i][j].id);
                }
            } else {
                changeToUnvisitedNode(grid[i][j].id);
            }
        }
    }
}