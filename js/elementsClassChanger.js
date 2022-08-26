
export function changeToPathNode(value){
    const element = document.getElementById(value);
    if (value !== null) {
        if(element.className === "start"){
            element.className = 'start-shortest-path';
        }
        if(element.className === "finish"){
            element.className = 'finish-shortest-path';
        }
        if (element.className !== "start-shortest-path" && element.className !== "finish-shortest-path") {
            element.className = 'shorthest-path';
        }
    }
}

export function changeToVisitedNode(value){
    const element = document.getElementById(value);
    if (value !== null) {
        if (element.className !== "start" && element.className !== "finish") {
            element.className = "visited";
        }
    }
}

export function changeToUnvisitedNode(value){
    if (value !== null) {
        if (document.getElementById(value).className !== "start" && document.getElementById(value).className !== "finish") {
            document.getElementById(value).setAttribute('class', 'unvisited');
        }
    }
}

export function changeToWallNode(value){
    if (value !== null) {
        if (document.getElementById(value).className !== "start" && document.getElementById(value).className !== "finish") {
            document.getElementById(value).setAttribute('class', 'wall');
        }
    }
}

export function changeToPathNodeWithSlider(value){
    const element = document.getElementById(value);
    if (value !== null) {
        if(element.className === "start"){
            element.className = 'start-shortest-path';
        }
        if(element.className === "finish"){
            element.className = 'finish-shortest-path';
        }
        if (element.className !== "start-shortest-path" && element.className !== "finish-shortest-path") {
            element.className = 'shorthest-path-slider';
        }
    }
}



export function changeToVisitedNodeWithSlider(value){
    const element = document.getElementById(value);
    if (value !== null) {
        if (element.className !== "start" && element.className !== "finish") {
            element.className = "visited-slider";
        }
    }
}


