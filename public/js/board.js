import { Node } from "./dataStructures.js";
export class Board {

    constructor(row, column, container) {
        this.row = row;
        this.column = column;
        this.container = container;
        this.grid = new Array();
        this.adjacencyList = new Array(this.row * this.column);

        for (let i = 0; i < this.adjacencyList.length; i++) {
            this.adjacencyList[i] = new Array();
        }
    }

    setup() {
        this.generateHtmlTable();
        this.createGrid();
    }

    createGrid() {
        let id = 0;
        for (let i = 0; i < this.row; i++) {
            this.grid[i] = new Array();
            for (let j = 0; j < this.column; j++) {
                this.grid[i][j] = new Node(i, j, id);
                id++;
            }
        }

        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                const node = this.grid[i][j];
                for (const neighbour of this.getNeighbors(this.row, this.column, i, j)) {
                    switch (neighbour.position) {
                        case "Top":
                            node.top = this.grid[neighbour.row][neighbour.column];
                            break;
                        case "Left":
                            node.left = this.grid[neighbour.row][neighbour.column];
                            break;
                        case "Bottom":
                            node.bottom = this.grid[neighbour.row][neighbour.column];
                            break;
                        case "Right":
                            node.right = this.grid[neighbour.row][neighbour.column];
                            break;
                    }
                    this.#addEdge(this.adjacencyList, node.id, this.grid[neighbour.row][neighbour.column].id);
                }
            }
        }
    }


    getNeighbors(maxRow, maxCol, curentRow, currentCol) {
        const neighbors = [];
        if (curentRow !== 0) neighbors.push({ position: "Top", row: curentRow - 1, column: currentCol });    //top neighbour
        if (currentCol !== 0) neighbors.push({ position: "Left", row: curentRow, column: currentCol - 1 });   //left neighbour
        if (curentRow !== maxRow - 1) neighbors.push({ position: "Bottom", row: curentRow + 1, column: currentCol });   //bottom neighbour
        if (currentCol !== maxCol - 1) neighbors.push({ position: "Right", row: curentRow, column: currentCol + 1 });  //right neighbour

        return neighbors;
    }

    generateHtmlTable() {
        let counter = 0;

        for (let i = 0; i < this.row; i++) {

            let tr = (document.createElement('tr'));
            for (let j = 0; j < this.column; j++) {

                let td = document.createElement('td');
                td.setAttribute('class', 'unvisited');
                td.setAttribute('id', counter);
                tr.append(td);
                counter++;
            }

            this.container.append(tr);
        }
    }


    //========================================================================FOR CLEARING==========================================

    clearBoard(sliderType) {
        document.getElementById(sliderType).value = 0;
        for (let i = 0; i < this.adjacencyList.length; i++) {
            this.adjacencyList[i] = new Array();
        }
        this.createGrid();
        for (let i = 0; i < this.row * this.column; i++) {
            const node = document.getElementById(`${i}`);
            if(node.className === "start-shortest-path"){
                node.className = "start";
            }
            if(node.className === "finish-shortest-path"){
                node.className = "finish";
            }
            if (node.className !== "start" && node.className !== "finish" && node.className !== "start2") {
                node.className  = "unvisited";
            }
        }
    }

    clearPath() {
        for (let i = 0; i < this.row * this.column; i++) {
            const node = document.getElementById(`${i}`);
            if(node.className === "start-shortest-path"){
                node.className = "start";
            }
            if(node.className === "finish-shortest-path"){
                node.className = "finish";
            }
            if (node.className !== "start" && node.className !== "finish" && node.className !== "wall" && node.className !== "start2") {
                node.setAttribute('class', "unvisited");
            }
        }
    }

    wallBoard() {

        for (let i = 0; i < this.adjacencyList.length; i++) {
            this.adjacencyList[i] = new Array();
        }
        this.createGrid();
        for (let i = 0; i < this.row * this.column; i++) {
            const node = document.getElementById(`${i}`);
            if(node.className === "start-shortest-path"){
                node.className = "start";
            }
            if(node.className === "finish-shortest-path"){
                node.className = "finish";
            }
            if (node.className !== "start" && node.className !== "finish" && node.className !== "start2") {
                node.setAttribute('class', "wall");
            }
        }
    }

    resetBoard(sliderType) {
        document.getElementById(sliderType).value = 0;
        for (let i = 0; i < this.row * this.column; i++) {
            const node = document.getElementById(`${i}`);
            if(node.className === "start-shortest-path"){
                node.className = "start";
            }
            if(node.className === "finish-shortest-path"){
                node.className = "finish";
            }
            if (node.className !== "start" && node.className !== "finish" && node.className !=="weight" && node.className !== "wall" && node.className !== "start2") {
                node.setAttribute('class', "unvisited");
            }
        }
    }

    resetBoardForSlider(){
        for (let i = 0; i < this.row * this.column; i++) {
            const node = document.getElementById(`${i}`);
            if(node.className === "start-shortest-path"){
                node.className = "start";
            }
            if(node.className === "finish-shortest-path"){
                node.className = "finish";
            }
            if (node.className !== "start" && node.className !== "finish" && node.className !== "wall" && node.className !== "start2") {
                node.setAttribute('class', "unvisited");
            }
        }
    }

    #addEdge(adj, i, j) {
        if (!adj[i].includes(j)) {
            adj[i].push(j);
            adj[j].push(i);
        }
    }

    // removeEdge(adj, i) {
    //     adj[i] = [];
    //     adj.forEach(element => {
    //         if (element.includes(i)) {
    //             let index = element.indexOf(i);
    //             element.splice(index, 1);
    //         }
    //     });
    // }
}