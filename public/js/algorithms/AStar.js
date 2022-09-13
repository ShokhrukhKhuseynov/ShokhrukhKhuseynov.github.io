import { PriorityQueue } from "../dataStructures.js";
import { visitedNodesAnimation, shortestPathNodesAnimation } from "../animations/algoAnimation.js";
import { shortestPathAnimationSlider} from "../animations/algoSliderAnimation.js";
import { changeToPathNode, changeToVisitedNode } from "../elementsClassChanger.js";
export async function aStartSearch(adj, grid, start, target, instant, currentSliderVal, slider, sliderType, speed) {

    const targetNode = getNode(grid, target);
    const visitedNodesToAnimate = [];

    const priorityQueue = new PriorityQueue();
    const cameFrom = new Map();
    const costSoFar = new Map();

    priorityQueue.enqueue(start, 0);
    cameFrom.set(start, -1);
    costSoFar.set(start, 0);

    while (!priorityQueue.isEmpty()) {
        const current = priorityQueue.dequeue();
        if (instant) {
            changeToVisitedNode(current);
        }else {
            visitedNodesToAnimate.push(current);
        }

        if (current == target) {

            const shortestPath = new Array();
            let crawl = target;
            shortestPath.push(crawl);
            while (cameFrom.get(crawl) !== -1) {

                if (instant) {
                    changeToPathNode(crawl);
                } else {
                    shortestPath.push(cameFrom.get(crawl));
                }
                crawl = cameFrom.get(crawl);
            }
            if (!instant && !slider) {
                await shortestPathNodesAnimation(visitedNodesToAnimate, shortestPath, sliderType, speed);
            }

            if(slider){
                shortestPathAnimationSlider(visitedNodesToAnimate, shortestPath, currentSliderVal, true);
            }
            return new Promise(resovle =>resovle());
        }

        for (let i = 0; i < adj[current].length; i++) {
            const neighbour = adj[current][i];
            let newCost = costSoFar.get(current) + 1;
            if(document.getElementById(neighbour).className === "weight") newCost = costSoFar.get(current) + 10;
            if ((!costSoFar.has(neighbour) || newCost < costSoFar.get(neighbour)) && document.getElementById(neighbour).className !== "wall") {
                const neighbourNode = getNode(grid, neighbour);
                costSoFar.set(neighbour, newCost);
                const priority = newCost + heuristicManhattan(targetNode, neighbourNode);
                priorityQueue.enqueue(neighbour, priority);
                cameFrom.set(neighbour, current);
            }
        }
    }
    if (!instant && !slider) {
        await visitedNodesAnimation(visitedNodesToAnimate, 0,sliderType, false, speed);
        
    }
    if(slider){
        shortestPathAnimationSlider(visitedNodesToAnimate, [], currentSliderVal, false);
    }
    return new Promise(resovle =>resovle());
}

function heuristicManhattan(aNode, bNode) {
    return Math.abs(aNode.row - bNode.row) + Math.abs(aNode.column - bNode.column);
}

function getNode(grid, value) {

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].id == value) {
                return grid[i][j];
            }
        }
    }

    return null;
}
