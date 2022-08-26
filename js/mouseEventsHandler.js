import { Node } from "./dataStructures.js";

let mouse_down = false;

export let startPointExist = true;
export let startPoint2Exist = false;
export let bothPointsExist = false;
let finishPointExist = true;

export function onMouseDown(){
    mouse_down = true;
}

export function onMouseUp(){
    mouse_down = false;
}


export function onMouseClick(adjList, grid) {

    const target = event.target;
   
    if (target.tagName === "TD") {
        if (startPointExist && finishPointExist) {
            if (target.className !== "start" && target.className !== "finish" && target.className !== "start2") {
                if (target.className === "unvisited") {
                    document.getElementById(target.id).className = "wall";
                    removeNodeFromAdjList(adjList, parseInt(target.id));
                } else {
                    document.getElementById(target.id).className = "unvisited";
                    addNodeToAdjList(adjList, grid, parseInt(target.id));
                }
            }
        }
    }
}

export function onMouseOut(board, sliderType){

    const target = event.target;
    if (target.tagName === "TD") {
        if (mouse_down) {
            board.resetBoard(sliderType);
            if (target.className === "start" && target.className !== "finish" && finishPointExist) {
                document.getElementById(target.id).className = "unvisited";
                startPointExist = false;
            } else if (target.className === "finish" && target.className !== "start" && startPointExist) {
                document.getElementById(target.id).className = "unvisited";
                finishPointExist = false;
            }
        }
    }
}

export function onMouseOver(adj, grid, startID, finishID, listAlgorithms, type){


    const target = event.target;

    if (!startPointExist) {
        if (target.className !== "finish" && target.className !== "wall") {
            document.getElementById(target.id).className = "start";
            startID = parseInt(target.id);
            startPointExist = true;
        }
    } else if (!finishPointExist) {
        if (target.className !== "start" && target.className !== "wall") {
            document.getElementById(target.id).className = "finish";
            finishID = parseInt(target.id);
            finishPointExist = true;
            // if(type === "BFS"){
            //     listAlgorithms[0](adj, startID, finishID, true ,0);
            // }else if(type == "BID") {
            //     listAlgorithms[1](adj, startID, finishID, true ,0);
            // }else if(type == "GBFS"){
            //     listAlgorithms[2](adj, grid, startID, finishID, true, 0);
            // }else if(type == "ASTAR"){
            //     listAlgorithms[3](adj, grid, startID, finishID, true, 0);
            // }
        }
    } else {
        if (mouse_down) {
            if (target.className === "unvisited") {
                document.getElementById(target.id).className = "wall";
                removeNodeFromAdjList(adj, parseInt(target.id));
            } else if (target.className === "wall") {
                document.getElementById(target.id).className = "unvisited";
                addNodeToAdjList(adj,grid, parseInt(target.id));
            }
        }
    }

    return [startID, finishID];
}



function addNodeToAdjList(adj, grid, nodeId){
    let targetRow;
    let targetCol;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].id === parseInt(nodeId)) {
                targetRow = grid[i][j].row;
                targetCol = grid[i][j].column;
            }            
        }
    }

    for (const key in grid[targetRow][targetCol]) {
        if (Object.hasOwnProperty.call(grid[targetRow][targetCol], key)) {

            const element = grid[targetRow][targetCol][key];
            if (element instanceof Node) {
                addEdge(adj, nodeId, element.id);
            }
        }
    }

}

function removeNodeFromAdjList(adj, nodeId){
    removeEdge(adj, nodeId);
}


function removeEdge(adj, i) {
    adj[i] = new Array();
    adj.forEach(element => {
        if (element.includes(i)) {
            let index = element.indexOf(i);
            element.splice(index, 1);
        }
    });
}

function addEdge(adj, i, j) {
    if (j !== null) {
        if (!adj[i].includes(j)) {
            adj[i].push(j);
            adj[j].push(i);
        }
    }
}
