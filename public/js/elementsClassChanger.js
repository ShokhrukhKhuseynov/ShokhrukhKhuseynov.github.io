
export function changeToPathNode(value){
    const element = document.getElementById(value);
    if (value !== null) {
        if(element.className === "start-visited"){
            element.className = 'start-shortest-path';
        }
        if(element.className === "finish-visited"){
            element.className = 'finish-shortest-path';
        }
        if(element.className === "weight-visited"){
            element.className = "weight-shortest-path";
        }
        if (element.className !== "start-shortest-path" && element.className !== "finish-shortest-path" && element.className !== "weight-shortest-path") {
            element.className = 'shorthest-path';
        }
    }
}

export function changeToVisitedNode(value){
    const element = document.getElementById(value);
    if (value !== null) {
        if (element.className !== "start" && element.className !== "finish" && element.className !== "weight") {
            element.className = "visited";
        }
        if(element.className === "weight"){
            element.className = "weight-visited";
        }else if(element.className === "start"){
            element.className = "start-visited";
        }else if(element.className === "finish"){
            element.className = "finish-visited";
        }
    }
}

export function changeToUnvisitedNode(value){
    const element = document.getElementById(value);
    if (value !== null) {
        if (element.className !== "start" && element.className !== "finish") {
            element.className = 'unvisited';
        }
    }
}

export function changeToWallNode(value){
    const element = document.getElementById(value);
    if (value !== null) {
        if (element.className !== "start" && element.className !== "finish") {
            element.className = 'wall';
        }
    }
}

export function changeToWeightNode(value){
    const element = document.getElementById(value);
    if (value !== null) {
        if (element.className !== "start" && element.className !== "finish") {
            element.className = 'weight';
        }
    }
}

export function changeToPathNodeWithSlider(value){
    const element = document.getElementById(value);
    if (value !== null) {
        if(element.className === "start-visited-slider"){
            element.className = 'start-shortest-path-slider';
        }
        if(element.className === "finish-visited-slider"){
            element.className = 'finish-shortest-path-slider';
        }
        if(element.className === "weight-visited-slider"){
            element.className = 'weight-shortest-path-slider';
        }
        if (element.className !== "start-shortest-path-slider" && element.className !== "finish-shortest-path-slider" && element.className !== "weight-shortest-path-slider") {
            element.className = 'shorthest-path-slider';
        }
    }
}



export function changeToVisitedNodeWithSlider(value){
    const element = document.getElementById(value);
    if (value !== null) {
       
        if (element.className !== "start" && element.className !== "finish" && element.className !== "weight") {
            element.className = "visited-slider";
        }
        if(element.className === "weight"){
            element.className = "weight-visited-slider";
        }else if(element.className === "start"){
            element.className = "start-visited-slider";
        }else if(element.className === "finish"){
            element.className = "finish-visited-slider";
        }
      
    }
}


