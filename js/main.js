import { Board } from './board.js';
import { RecursionDivision } from './mazes/recursionDivision.js';
import { wallsAnimation, unvisitedAnimation } from './animations/mazeAnimation.js';
import { HandK } from './mazes/H&K.js';
import { onMouseDown, onMouseUp, onMouseClick, onMouseOut, onMouseOver, startPoint2Exist, startPointExist } from './mouseEventsHandler.js';
import { shortestPathBFS } from './algorithms/BFS.js';
import { bidirectionalSearch } from './algorithms/bidirectional.js';
import { greedyBestFirstSearch } from './algorithms/greedyBestFirst.js';
import { aStartSearch } from './algorithms/AStar.js';
import { BacktrackingMaze } from './mazes/backtracking.js';
const tableContainer = document.getElementById("tableContainer");
//====================================================================zero = 0 is equal to undefined!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//===========================================================SETUP=================================================================================

const row = 25;
const column = 51;
const board = new Board(row, column, tableContainer);
board.setup();

let startID = 580;
let startID2 = 894;
let startSelected;
let start2Selected;
let finishID = 595;
document.getElementById(startID).className = "start";
document.getElementById(startID2).className = "start2";
document.getElementById(finishID).className = "finish";


//==============================================MAZES=========================================================================================

const mazeSubmenu = document.getElementById('maze-sub-menu');
mazeSubmenu.onclick = (e) => {
    const target = e.target;
    switch (target.id) {
        case "RD":
            const recDiv = new RecursionDivision(board.grid);
            board.clearBoard(sliderType);
            recDiv.recursiveDivisionMaze(column, row);
            disbaleMenu(true, wallsAnimation(recDiv.wallsToAnimate));
            break;

        case "HK":
            const hAndK = new HandK(board.grid);
            board.wallBoard();
            hAndK.huntAndKillMaze(column, row);
            disbaleMenu(true, unvisitedAnimation(hAndK.unvisitedToAnimate));
            break;

        case "BT":
            const backtracking = new BacktrackingMaze(board.grid);
            board.wallBoard();
            backtracking.backtrackingMazeGenerator(column, row);
            disbaleMenu(true, unvisitedAnimation(backtracking.unvisitedToAnimate));
            break;
    }
    mazeSubmenu.innerHTML = "";
    setTimeout(() => mazeSubmenu.innerHTML = '<li id="RD">Recursion Division</li><li id="HK">H & K</li><li id="BT">Backtracking</li>', 500);

};

//==========================================================ALGORITHMS=================================================================================

const a = document.getElementById("algorithm-response");
const algoSubmenu = document.getElementById('algo-sub-menu');
let algorithmType = null;

// algoSubmenu.onclick = (e) => {
//     board.resetBoard(sliderType);
//     const target = e.target;
//     algorithmType = null;
//     for (const element of algoSubmenu.children) {
//         if(element.id === target.id){
//             a.innerText = element.id + " selected";
//             algorithmType = element.id;
//         }
//     }
//     if(sliderType === "slider-disabled")sliderType = document.getElementById('slider-disabled').id = "slider";
// };


algoSubmenu.onclick = (e) => {
    board.resetBoard(sliderType);
    const target = e.target;
    algorithmType = null;
    let bothAlgorithmsSelected;
    for (const element of algoSubmenu.children) {
        if (element.id === target.id) {
            a.style.display = "inline";
            a.innerText = element.innerText + " selected";
            algorithmType = element.id;
            bothAlgorithmsSelected = trackSelectedElement(element.id);
            break;
        }
        a.innerText = "Please select an algorithm";
    }
    if(bothAlgorithmsSelected){
        for (const element of algoSubmenu.children) {
            if (element.className !== "active1" && element.className !== "active2"){
                document.getElementById(element.id).className = "inactive";
            }
        }
    }else if(bothAlgorithmsSelected !== undefined){
        for (const element of algoSubmenu.children) {
            if (element.className !== "active1" && element.className !== "active2"){
                document.getElementById(element.id).className = "";
            }
        }
    }
    if (sliderType === "slider-disabled") sliderType = document.getElementById('slider-disabled').id = "slider";
};

function trackSelectedElement(id) {

   if(!startSelected){
    if(document.getElementById(id).className !== "active2"){
        document.getElementById(id).className = "active1";
        startSelected = true;
    }
   }else{
    if(document.getElementById(id).className === "active1"){
        document.getElementById(id).className = "";
        startSelected = false;
    }
   }

   if(!start2Selected && startSelected){
    if(document.getElementById(id).className !== "active1"){
        document.getElementById(id).className = "active2";
        start2Selected = true;
    }
   }else{
    if(document.getElementById(id).className === "active2"){
        document.getElementById(id).className = "";
        start2Selected = false;
    }
   }

   if(startSelected && start2Selected) return true;
   
   return false;

}



// document.getElementById(id).className = "";
// startSelected = false;

//======================================================SPEED===============================================================================

const speedSubmenu = document.getElementById('speed-sub-menu');
let speed = 15;

speedSubmenu.onclick = (e) => {
    const target = e.target;
    switch (target.id) {
        case "speed-slow":
            speed = 90;
            break;

        case "speed-average":
            speed = 40;
            break;

        default:
            speed = 15;
            break;
    }
};

//============================================================START BUTTON==================================================================

const playBtn = document.getElementById("play-btn");
playBtn.onclick = () => {
    board.resetBoard(sliderType);
    a.style.display = "inline";
    if (sliderType !== "slider-disabled") sliderType = document.getElementById('slider').id = "slider-disabled";
    switch (algorithmType) {

        case "BFS":
            disbaleMenu(false, shortestPathBFS(board.adjacencyList, startID, finishID, false, 0, false, sliderType, speed));
            break;

        case "BID":
            disbaleMenu(false, bidirectionalSearch(board.adjacencyList, startID, finishID, false, 0, false, sliderType, speed));
            break;

        case "GBFS":
            disbaleMenu(false, greedyBestFirstSearch(board.adjacencyList, board.grid, startID, finishID, false, 0, false, sliderType, speed));
            break;

        case "ASTAR":
            disbaleMenu(false, aStartSearch(board.adjacencyList, board.grid, startID, finishID, false, 0, false, sliderType, speed));
            break;
    }

};


//========================================================SLIDER=======================================================================================

const slider = document.getElementById('slider-disabled');
let sliderType = slider.id;

slider.oninput = () => {
    board.resetBoardForSlider();
    if (algorithmType === "BFS") {
        shortestPathBFS(board.adjacencyList, startID, finishID, false, slider.value, true, sliderType, speed);
    } else if (algorithmType === "BID") {
        bidirectionalSearch(board.adjacencyList, startID, finishID, false, slider.value, true, sliderType, speed);
    } else if (algorithmType === "GBFS") {
        greedyBestFirstSearch(board.adjacencyList, board.grid, startID, finishID, false, slider.value, true, sliderType, speed);
    } else if (algorithmType === "ASTAR") {
        aStartSearch(board.adjacencyList, board.grid, startID, finishID, false, slider.value, true, sliderType, speed);
    }
};


//========================================================CLEAR BUTTONS==============================================================================

const clearBoardBtn = document.getElementById("clear-board-btn");
clearBoardBtn.onclick = () => board.clearBoard(sliderType);

const clearPathBtn = document.getElementById("clear-path-btn");
clearPathBtn.onclick = () => board.resetBoard(sliderType);



//===========================================================DISABALED MENU===========================================================================

async function disbaleMenu(mazeGenerator, func) {

    const sideBar = document.getElementById('side-bar');
    const menu = document.getElementsByClassName('menu')[0];

    sideBar.style.pointerEvents = "none";
    menu.style.color = "rgb(190, 190, 190)";
    document.getElementById('play-btn').id = "play-btn-disabled";
    document.getElementById('clear-path-btn').id = "clear-path-btn-disabled";
    document.getElementById('clear-board-btn').id = "clear-board-btn-disabled";
    document.getElementById('table').id = "table-disabled";

    await func;

    sideBar.style.pointerEvents = "all";
    menu.style.color = "rgb(36, 36, 36)";
    document.getElementById('play-btn-disabled').id = "play-btn";
    document.getElementById('clear-path-btn-disabled').id = "clear-path-btn";
    document.getElementById('clear-board-btn-disabled').id = "clear-board-btn";
    document.getElementById('table-disabled').id = "table";

    if (!mazeGenerator) sliderType = document.getElementById('slider-disabled').id = "slider";

}

//===============================================================MOUSE HANDLER====================================================================

tableContainer.onmousedown = onMouseDown;
tableContainer.onmouseup = onMouseUp;
tableContainer.onclick = () => onMouseClick(board.adjacencyList, board.grid);
tableContainer.onmouseout = () => onMouseOut(board, sliderType);
tableContainer.onmouseover = () => {
    const result = onMouseOver(board.adjacencyList, board.grid, startID, finishID, [shortestPathBFS, bidirectionalSearch, greedyBestFirstSearch, aStartSearch], algorithmType);

    startID = result[0];
    finishID = result[1];
};



//====================================================================================================================================================
