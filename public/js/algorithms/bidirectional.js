import { Queue } from "../dataStructures.js";
import { visitedNodesAnimation, shortestPathNodesAnimation } from "../animations/algoAnimation.js";
import { shortestPathAnimationSlider} from "../animations/algoSliderAnimation.js";
import { changeToPathNode, changeToVisitedNode } from "../elementsClassChanger.js";
export async function bidirectionalSearch(adj, startNode, targetNode, instant, currentSliderVal, slider, sliderType, speed) {
    let shortestPath = [];
    const visitedNodesToAnimate = [];
    visitedNodesToAnimate.push(startNode);
    visitedNodesToAnimate.push(targetNode);

    const visited1 = [];
    const visited2 = [];

    const parent1 = new Map();
    const parent2 = new Map();

    for (let i = 0; i < adj.length; i++) {
        visited1.push(false);
        visited2.push(false);

        parent1.set(i, -1);
        parent1.set(i, -1);
    }

    const queue1 = new Queue();
    const queue2 = new Queue();

    queue1.enqueue(startNode);
    visited1[startNode] = true;
    parent1.set(startNode, -1);
    queue2.enqueue(targetNode);
    visited2[targetNode] = true;
    parent2.set(targetNode, -1);
    let intersection = -1;

    while (!queue1.isEmpty() && !queue2.isEmpty() && intersection === -1) {
        BFS(adj, queue1, visited1, parent1, visitedNodesToAnimate, instant);
        BFS(adj, queue2, visited2, parent2, visitedNodesToAnimate, instant);

        for (let i = 0; i < adj.length; i++) {
            if (visited1[i] && visited2[i]) {
                intersection = i;
                break;
            }

        }
    }
    

    if (intersection === -1) {
        if (!instant && !slider) {
            await visitedNodesAnimation(visitedNodesToAnimate, 0, sliderType, false, speed);
        }
        if(slider){
            shortestPathAnimationSlider(visitedNodesToAnimate, [], currentSliderVal, false);
        }
        return new Promise(resovle =>resovle());
    }

    let j = intersection;

    while (j !== -1) {
        if (instant) {
            changeToPathNode(j);
        } else {
            shortestPath.push(j);
        }
        j = parent1.get(j);
    }
    shortestPath = shortestPath.reverse();
    j = parent2.get(intersection);
    while (j !== -1) {
        if (instant) {
            changeToPathNode(j);
        } else {
            shortestPath.push(j);
        }
        j = parent2.get(j);
    }
    shortestPath = shortestPath.reverse();
    if (!instant && !slider) {
      await shortestPathNodesAnimation(visitedNodesToAnimate, shortestPath, sliderType, speed);
    }

    if(slider){
        shortestPathAnimationSlider(visitedNodesToAnimate, shortestPath, currentSliderVal, true);
    }
    return new Promise(resovle =>resovle());
}

function BFS(adj, queue, visited, parent, visitedNodesToAnimate, instant) {
    const current = queue.dequeue();

    for (let i = 0; i < adj[current].length; i++) {
        const neighbour = adj[current][i];
        if (!visited[neighbour] && document.getElementById(neighbour).className !== "wall") {
            queue.enqueue(neighbour);
            visited[neighbour] = true;
            parent.set(neighbour, current);
            if (instant) {
                changeToVisitedNode(neighbour);
            } else {
                visitedNodesToAnimate.push(neighbour);
            }

        }
    }
}
