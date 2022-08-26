import { visitedNodesAnimation, shortestPathNodesAnimation } from "../animations/algoAnimation.js";
import { shortestPathAnimationSlider} from "../animations/algoSliderAnimation.js";
import { changeToPathNode, changeToVisitedNode } from "../elementsClassChanger.js";
import { Queue } from "../dataStructures.js"




export async function shortestPathBFS(adj, startNode, targetNode, instant, currentSliderVal, slider,sliderType, speed) {

    const visitedNodesToAnimate = [];

    const previous = new Map();
    const visited = new Set();
    const queue = new Queue();

    queue.enqueue({ node: startNode, dist: 0 });
    visited.add(startNode);
    previous.set(startNode, -1);
    visitedNodesToAnimate.push(startNode);

    while (!queue.isEmpty()) {
        const { node, dist } = queue.dequeue();

        for (let i = 0; i < adj[node].length; i++) {
            const neighbour = adj[node][i];

            if (!visited.has(neighbour) && document.getElementById(neighbour).className !== "wall") {
                visited.add(neighbour);
                previous.set(neighbour, node);

                queue.enqueue({ node: neighbour, dist: dist + 1 });
                visitedNodesToAnimate.push(neighbour);
                if (instant) {
                    changeToVisitedNode(neighbour);
                }
            }


            if (neighbour === targetNode) {
                const shortestPath = new Array();
                let crawl = targetNode;
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
                  await shortestPathNodesAnimation(visitedNodesToAnimate, shortestPath,sliderType, speed);
                }
                if(slider){
                    shortestPathAnimationSlider(visitedNodesToAnimate, shortestPath, currentSliderVal, true);
                }
                return new Promise(resovle =>resovle());
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