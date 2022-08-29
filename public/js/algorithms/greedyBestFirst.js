import { PriorityQueue } from "../dataStructures.js";
import { visitedNodesAnimation, shortestPathNodesAnimation } from "../animations/algoAnimation.js";
import { shortestPathAnimationSlider} from "../animations/algoSliderAnimation.js";
import { changeToPathNode, changeToVisitedNode } from "../elementsClassChanger.js";
export async function greedyBestFirstSearch(adj, grid, start, target, instant, currentSliderVal, slider, sliderType, speed) {

    const targetNode = getNode(grid, target);
    const visitedNodesToAnimate = [];

    const priorityQueue = new PriorityQueue();
    const previous = new Map();
    const visited = [];

    priorityQueue.enqueue(start, 0);
    previous.set(start, -1);
    visited[start] = true;

    while (!priorityQueue.isEmpty()) {
        const current = priorityQueue.dequeue();
        if (instant) {
            changeToVisitedNode(current);
        } else {
            visitedNodesToAnimate.push(current);
        }

        if (current === target) {
            const shortestPath = new Array();
            let crawl = target;
            shortestPath.push(crawl);
            while (previous.get(crawl) !== -1) {

                if (instant) {
                    changeToPathNode(crawl);
                } else {
                    shortestPath.push(previous.get(crawl));
                }
                crawl = previous.get(crawl);
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
            if (!visited[neighbour] && document.getElementById(neighbour).className !== "wall") {
                const neighbourNode = getNode(grid, neighbour);
                const priority = heuristicManhattan(targetNode, neighbourNode);
                priorityQueue.enqueue(neighbour, priority);
                previous.set(neighbour, current);
                visited[neighbour] = true;
            }
        }
    }

    if (!instant && !slider) {
       await visitedNodesAnimation(visitedNodesToAnimate, 0, sliderType, false, speed);
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
