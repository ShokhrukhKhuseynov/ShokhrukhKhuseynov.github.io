import { Board } from './board.js';
import { RecursionDivision } from './mazes/recursionDivision.js';
import { wallsAnimation, unvisitedAnimation } from './animations/mazeAnimation.js';
import { onMouseDown, onMouseUp, onMouseClick, onMouseOut, onMouseOver} from './mouseEventsHandler.js';
import { shortestPathBFS } from './algorithms/BFS.js';
import { bidirectionalSearch } from './algorithms/bidirectional.js';
import { greedyBestFirstSearch } from './algorithms/greedyBestFirst.js';
import { aStartSearch } from './algorithms/AStar.js';
import { BacktrackingMaze } from './mazes/backtracking.js';
import { randomBasicMaze } from './mazes/basicMaze.js';
function $(x) { return document.getElementById(x); }
const tableContainer = $("tableContainer");


//===========================================================SETUP=================================================================================

const row = 29;
const column = 53;
const board = new Board(row, column, tableContainer);
board.setup();

let startID = 600;
let finishID = 620;
$(startID).className = "start";
$(finishID).className = "finish";

const sideBar = $('side-bar');
sideBar.style.pointerEvents = "none";
let table = $('table').id = "table-disabled";
const weightenCells = new Array();


//==============================================DIALOG MENU=========================================================================================

const dialog = document.getElementsByClassName('dialog')[0];

dialog.onclick = () => {

    const target = event.target;

    if (target.tagName === "BUTTON") {

        switch (target.id) {

            case "next":
                nextDialogPage();
                break;

            case "previous":
                previousDialogPage();
                break;

            case "close":
                dialog.style.display = "none";
                sideBar.style.pointerEvents = "all";
                table = $(table).id = "table";
                break;
        }
    }
}

function previousDialogPage() {
    switch (dialog.id) {
        case 'page-2':
            dialog.id = 'page-1';
            dialog.innerHTML = ' <h1>Welcome to Path Finder</h1>' +
                '<h3>This aplication demonstrates in action different types of pathfinding algorithms</h3>' +
                '<p>The algorithms explore grid to find shortest path between two points</p>' +
                '<img id="dialog-image" src="./public/images/twoPoints.png"/>' +
                '<button class="dialog-button" id="previous">PREVIOUS</button><button class="dialog-button" id="next">NEXT</button><button class="dialog-button" id="close">CLOSE</button>';
            $('previous').style.display = "none";
            break;

        case 'page-3':
            dialog.id = "page-2";
            dialog.innerHTML = '<h1>Alogirthms</h1><p>There are two types of algorithms <b>weighted</b> and <b>unweighted</b></p>' +
                '<p><b>Weigthed</b> is able to count the cost of next step, weighted cells <b>can</b> be apllied<br>' +
                '<b>Unweighted</b> assumes each next step has cost of 1, weighted cells <b>cannot</b> be applied</p>' +
                '<p><b>Breadth First Search</b> is unweighted, shortest path is guaranteed<br>' +
                '<b>Bidirectional</b> is unweighted, shortest path is not guaranteed<br>' +
                '<b>Greedy Best-First Search</b> is weighted, shortest path is not guaranteed<br>' +
                '<b>A* Search</b> is weighted, shortest path is guaranteed</p>' +
                '<button class="dialog-button" id="previous">PREVIOUS</button><button class="dialog-button" id="next">NEXT</button><button class="dialog-button" id="close">CLOSE</button>';
            break;

        case 'page-4':
            dialog.id = "page-3";
            dialog.innerHTML = '<h1>Wall</h1>' +
                '<p><b>Press</b> left mouse button on the grid and drag it to add walls</p>' +
                '<img id="dialog-image" src="./public/images/wallGif.gif"/>' +
                '<button class="dialog-button" id="previous">PREVIOUS</button><button class="dialog-button" id="next">NEXT</button><button class="dialog-button" id="close">CLOSE</button>';
            break;

        case 'page-5':
            dialog.id = "page-4";
            dialog.innerHTML = '<h1>Weighted Cell</h1>' +
                '<h3>Each cell has a step cost, wheighted algorithms adjust route by step cost</h3>' +
                "<h3>Empty cells have cost of 1 step, whereas weighted cells have cost of 10 steps</h3>" +
                '<p><b>Right click</b> on the grid, select: "weight". <b>Press</b> left mouse button and drag it to add weights</p>' +
                '<img id="dialog-image" src="./public/images/weightGif.gif"/>' +
                '<button class="dialog-button" id="previous">PREVIOUS</button><button class="dialog-button" id="next">NEXT</button><button class="dialog-button" id="close">CLOSE</button>';
            break;

        case 'page-6':
            dialog.id = "page-5";
            dialog.innerHTML = '<h1>Slider</h1>' +
                "<p>Move the slider to left or right side to visualize the process manually</p>" +
                '<img style="height:max-content; width:max-content;" id="dialog-image" src="./public/images/sliderGif.gif"/>' +
                '<button class="dialog-button" id="previous">PREVIOUS</button><button class="dialog-button" id="next">NEXT</button><button class="dialog-button" id="close">CLOSE</button>';
            break;
    }
}

function nextDialogPage() {
    switch (dialog.id) {
        case 'page-1':
            dialog.innerHTML = '<h1>Alogirthms</h1><p>There are two types of algorithms <b>weighted</b> and <b>unweighted</b></p>' +
                '<p><b>Weigthed</b> is able to count the cost of next step, weighted cells <b>can</b> be apllied<br>' +
                '<b>Unweighted</b> assumes each next step has cost of 1, weighted cells <b>cannot</b> be applied</p>' +
                '<p><b>Breadth First Search</b> is unweighted, shortest path is guaranteed<br>' +
                '<b>Bidirectional</b> is unweighted, shortest path is not guaranteed<br>' +
                '<b>Greedy Best-First Search</b> is weighted, shortest path is not guaranteed<br>' +
                '<b>A* Search</b> is weighted, shortest path is guaranteed</p>' +
                '<button class="dialog-button" id="previous">PREVIOUS</button><button class="dialog-button" id="next">NEXT</button><button class="dialog-button" id="close">CLOSE</button>';
            dialog.id = 'page-2';
            $('previous').style.display = "inline";
            break;

        case 'page-2':
            dialog.innerHTML = '<h1>Wall</h1>' +
                '<p><b>Press</b> left mouse button on the grid and drag it to add walls</p>' +
                '<img id="dialog-image" src="./public/images/wallGif.gif"/>' +
                '<button class="dialog-button" id="previous">PREVIOUS</button><button class="dialog-button" id="next">NEXT</button><button class="dialog-button" id="close">CLOSE</button>';
            dialog.id = "page-3";
            break;

        case 'page-3':
            dialog.innerHTML = '<h1>Weighted Cell</h1>' +
                '<h3>Each cell has a step cost, wheighted algorithms adjust route by step cost</h3>' +
                "<h3>Empty cells have cost of 1 step, whereas weighted cells have cost of 10 steps</h3>" +
                '<p><b>Right click</b> on the grid, select: "weight". <b>Press</b> left mouse button and drag it to add weights</p>' +
                '<img id="dialog-image" src="./public/images/weightGif.gif"/>' +
                '<button class="dialog-button" id="previous">PREVIOUS</button><button class="dialog-button" id="next">NEXT</button><button class="dialog-button" id="close">CLOSE</button>';
            dialog.id = "page-4";
            break;

        case 'page-4':
            dialog.innerHTML = '<h1>Slider</h1>' +
                "<p>Move the slider to left or right side to visualize the process manually</p>" +
                '<img style="height:max-content; width:max-content;" id="dialog-image" src="./public/images/sliderGif.gif"/>' +
                '<button class="dialog-button" id="previous">PREVIOUS</button><button class="dialog-button" id="next">NEXT</button><button class="dialog-button" id="close">CLOSE</button>';
            dialog.id = "page-5";
            break;

        case 'page-5':
            dialog.innerHTML = '<h1>Enjoy!</h1>' +
                "<h3>Source page:</h3>" +
                '<a href="https://github.com/ShokhrukhKhuseynov"><div id="github" ></div></a>' +
                '<button class="dialog-button" id="previous">PREVIOUS</button><button class="dialog-button" id="next">NEXT</button><button class="dialog-button" id="close">CLOSE</button>';
            dialog.id = "page-6"
            $('next').style.display = "none";
            break;
    }


}


//==============================================MAZES=========================================================================================

const mazeSubmenu = $('maze-sub-menu');
mazeSubmenu.onclick = (e) => {
    const target = e.target;
    board.clearBoard(sliderType);
    switch (target.id) {
        case "RD":
            const recDiv = new RecursionDivision(board.grid);
            recDiv.recursiveDivisionMaze(column, row);
            disbaleMenu(true, wallsAnimation(recDiv.wallsToAnimate));
            break;

        case "HK":
            // const hAndK = new HandK(board.grid);
            // board.wallBoard();
            // hAndK.huntAndKillMaze(column, row);
            // disbaleMenu(true, unvisitedAnimation(hAndK.unvisitedToAnimate));
            randomBasicMaze(column, row, board.grid, wall, weightenCells);
            break;

        case "BT":
            const backtracking = new BacktrackingMaze(board.grid);
            board.wallBoard();
            backtracking.backtrackingMazeGenerator(column, row);
            disbaleMenu(true, unvisitedAnimation(backtracking.unvisitedToAnimate));
            break;
    }
    mazeSubmenu.innerHTML = "";
    setTimeout(() => {
        if (wall) mazeSubmenu.innerHTML = '<li id="RD">Recursion Division</li><li id="BT">Backtracking</li><li id="HK">Random Basic Maze</li>';
        else mazeSubmenu.innerHTML = '<li id="HK">Random Basic Maze</li>';
    }, 500);

};

//==========================================================ALGORITHMS=================================================================================

const a = $("algorithm-response");
const algoSubmenu = $('algo-sub-menu');
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
        if (sliderType !== "slider-disabled") sliderType = $(sliderType).id = "slider-disabled";
    }
    if ($(target.id).tagName === "LI") {
        $(target.id).className = "active";
        algorithmType = $(target.id).id;
        a.id = "algorithm-response-selected";
        a.innerHTML = $(target.id).innerHTML;
        sliderType = $(sliderType).id = "slider";
        activeElement = true;
    }
};


//======================================================SPEED===============================================================================

const speedSubmenu = $('speed-sub-menu');
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

const playBtn = $("play-btn");
playBtn.onclick = () => {
    board.resetBoard(sliderType);
    if (sliderType !== "slider-disabled") sliderType = $(sliderType).id = "slider-disabled";
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

const slider = $('slider-disabled');
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

const clearBoardBtn = $("clear-board-btn");
clearBoardBtn.onclick = () => board.clearBoard(sliderType);

const clearPathBtn = $("clear-path-btn");
clearPathBtn.onclick = () => board.resetBoard(sliderType);



//===========================================================DISABALED MENU===========================================================================

async function disbaleMenu(mazeGenerator, func) {


    const menu = document.getElementsByClassName('menu')[0];

    sideBar.style.pointerEvents = "none";
    menu.style.color = "#666666";
    $('play-btn').id = "play-btn-disabled";
    $('clear-path-btn').id = "clear-path-btn-disabled";
    $('clear-board-btn').id = "clear-board-btn-disabled";
    $('table').id = "table-disabled";
    await func;

    sideBar.style.pointerEvents = "all";
    menu.style.color = "#666666";
    $('play-btn-disabled').id = "play-btn";
    $('clear-path-btn-disabled').id = "clear-path-btn";
    $('clear-board-btn-disabled').id = "clear-board-btn";
    $('table-disabled').id = "table";

    if (!mazeGenerator) sliderType = $(sliderType).id = "slider";

}

//===============================================================MOUSE HANDLER====================================================================

tableContainer.onmousedown = onMouseDown;
tableContainer.onmouseup = onMouseUp;
tableContainer.onclick = () => {
    board.resetBoard(sliderType);
    onMouseClick(board.adjacencyList, board.grid, wall, weightenCells);
    contextMenu.style.display = "none";
};
tableContainer.onmouseout = () => onMouseOut(board, sliderType);
tableContainer.onmouseover = () => {
    const result = onMouseOver(board.adjacencyList, board.grid, startID, finishID, [shortestPathBFS, bidirectionalSearch, greedyBestFirstSearch, aStartSearch], algorithmType, wall);

    startID = result[0];
    finishID = result[1];
};



//===========================================================CONTEXT MENU=========================================================================================
let wall = true;
const contextMenu = $('context');
const contextMenuItem = $('context-menu');
document.oncontextmenu = () => {
    if ($('table-disabled')) {
        return false;
    } else {
        if (algorithmType === "BFS" || algorithmType === "BID") {
            contextMenuItem.lastElementChild.className = "context-menu-item-inactive";
        } else {
            if (contextMenuItem.lastElementChild.className !== "context-menu-item-active") contextMenuItem.lastElementChild.className = "";
        }

        contextMenu.style.left = `${event.pageX}px`;
        contextMenu.style.top = `${event.pageY}px`;
        contextMenu.style.display = "block";
        return false;
    }


};

contextMenu.onclick = () => {


    if (event.target.tagName === "LI") {
        board.resetBoard(sliderType);
        if (event.target.innerText === "Wall") {
            wall = true;
            if (!weightenCellExist()) {
                mazeSubmenu.innerHTML = '<li id="RD">Recursion Division</li><li id="BT">Backtracking</li><li id="HK">Random Basic Maze</li>';
                algoSubmenu.innerHTML = '<li id="BFS">Breadth First Search</li><li id="BID">Bidirectional</li><li id="GBFS">Greedy Best-First Search</li><li id="ASTAR">A* Search</li>';
            }
        } else {
            wall = false;
            mazeSubmenu.innerHTML = '<li id="HK">Random Basic Maze</li>';
            algoSubmenu.innerHTML = '<li id="GBFS">Greedy Best-First Search</li><li id="ASTAR">A* Search</li>';
        }
        algorithmType = null;
        sliderType = $(sliderType).id = "slider-disabled";
        $(sliderType).value = 0;
        a.id = "algorithm-response";
        a.innerText = "";
        for (const element of contextMenuItem.children) {
            if (element.innerText === event.target.innerText) {
                element.className = "context-menu-item-active";
            }
            else element.className = "";
        }
        contextMenu.style.display = "none";
    }
};

$('side-bar').onclick = () => contextMenu.style.display = "none";


function weightenCellExist() {

    for (const arr of tableContainer.children) {

        for (const element of arr.children) {
            if (element.className === "weight") return true;
        }
    }
    return false;
}
