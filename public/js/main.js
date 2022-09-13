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
import { randomBasicMaze } from './mazes/basicMaze.js';
const tableContainer = document.getElementById("tableContainer");
function $(x) { return document.getElementById(x); }
//====================================================================zero = 0 is equal to undefined!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//===========================================================SETUP=================================================================================

const row = 29;
const column = 53;
const board = new Board(row, column, tableContainer);
board.setup();

let startID = 600;
let finishID = 620;
document.getElementById(startID).className = "start";
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
            // const hAndK = new HandK(board.grid);
            // board.wallBoard();
            // hAndK.huntAndKillMaze(column, row);
            // disbaleMenu(true, unvisitedAnimation(hAndK.unvisitedToAnimate));
            board.clearBoard(sliderType);
            randomBasicMaze(column, row, board.grid, wall);
            break;

        case "BT":
            const backtracking = new BacktrackingMaze(board.grid);
            board.wallBoard();
            backtracking.backtrackingMazeGenerator(column, row);
            disbaleMenu(true, unvisitedAnimation(backtracking.unvisitedToAnimate));
            break;
    }
    mazeSubmenu.innerHTML = "";
    setTimeout(() => mazeSubmenu.innerHTML = '<li id="RD">Recursion Division</li><li id="BT">Backtracking</li><li id="HK">Random Basic Maze</li>', 500);

};

//==========================================================ALGORITHMS=================================================================================

const a = document.getElementById("algorithm-response");
const algoSubmenu = document.getElementById('algo-sub-menu');
let algorithmType = null;
let activeElement = false;
algoSubmenu.onclick = (e) => {
    board.resetBoard(sliderType);
    const target = e.target;
    algorithmType = null;
    for (const element of algoSubmenu.children) {
        element.className = "";
        a.id = "algorithm-response";
        a.innerHTML = "";
        if (sliderType !== "slider-disabled") sliderType = document.getElementById('slider').id = "slider-disabled";
    }
    if ($(target.id).tagName === "LI") {
        $(target.id).className = "active";
        algorithmType = $(target.id).id;
        a.id = "algorithm-response-selected";
        a.innerHTML = $(target.id).innerHTML;
        sliderType = document.getElementById('slider-disabled').id = "slider";
        activeElement = true;
    }
};


//======================================================SPEED===============================================================================

const speedSubmenu = document.getElementById('speed-sub-menu');
let speed = 0;

speedSubmenu.onclick = (e) => {
    const target = e.target;

    for (const element of speedSubmenu.children) {
        element.className = "";
    }
    if ($(target.id).tagName === "LI") {
        $(target.id).className = "active";
        switch (target.id) {
            case "speed-slow":
                speed = 250;
                break;

            case "speed-average":
                speed = 50;
                break;

            default:
                speed = 0;
                break;
        }
    }
};

//============================================================START BUTTON==================================================================

const playBtn = document.getElementById("play-btn");
playBtn.onclick = () => {
    board.resetBoard(sliderType);
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

        default:
            a.id = "algorithm-response-none";
            a.innerText = "Please select an algorithm";
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
    menu.style.color = "#666666";
    document.getElementById('play-btn').id = "play-btn-disabled";
    document.getElementById('clear-path-btn').id = "clear-path-btn-disabled";
    document.getElementById('clear-board-btn').id = "clear-board-btn-disabled";
    document.getElementById('table').id = "table-disabled";

    await func;

    sideBar.style.pointerEvents = "all";
    menu.style.color = "#666666";
    document.getElementById('play-btn-disabled').id = "play-btn";
    document.getElementById('clear-path-btn-disabled').id = "clear-path-btn";
    document.getElementById('clear-board-btn-disabled').id = "clear-board-btn";
    document.getElementById('table-disabled').id = "table";

    if (!mazeGenerator) sliderType = document.getElementById('slider-disabled').id = "slider";

}

//===============================================================MOUSE HANDLER====================================================================

tableContainer.onmousedown = onMouseDown;
tableContainer.onmouseup = onMouseUp;
tableContainer.onclick = () => {
    onMouseClick(board.adjacencyList, board.grid, wall);
    contextMenu.style.display = "none";
};
tableContainer.onmouseout = () => onMouseOut(board, sliderType);
tableContainer.onmouseover = () => {
    const result = onMouseOver(board.adjacencyList, board.grid, startID, finishID, [shortestPathBFS, bidirectionalSearch, greedyBestFirstSearch, aStartSearch], algorithmType);

    startID = result[0];
    finishID = result[1];
};



//====================================================================================================================================================
let wall = true;
const contextMenu = $('context');
document.oncontextmenu = () => {
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;
    contextMenu.style.display = "block";
    return false;
};

contextMenu.onclick = () => {

    const contextMenuItem = $('context-menu');

    for (const element of contextMenuItem.children) {
        element.className = "";
    }
    if (event.target.tagName === "LI") {
        if (event.target.innerText === "Wall") {
            wall = true;
        } else {
            wall = false;
        }
        event.target.className = "context-menu-item-active";
        contextMenu.style.display = "none";
    }
};
