import { changeToWallNode, changeToUnvisitedNode} from "../elementsClassChanger.js";
export function randomBasicMaze(width, height, grid){

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const randomNumber = Math.floor(Math.random() * 4);
            if(randomNumber === 1){
              changeToWallNode(grid[i][j].id);
            }else{
                changeToUnvisitedNode(grid[i][j].id);
            }
        }
    }
}