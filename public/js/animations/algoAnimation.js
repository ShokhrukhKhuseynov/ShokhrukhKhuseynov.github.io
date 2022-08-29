import { changeToPathNode, changeToVisitedNode } from "../elementsClassChanger.js";
export function visitedNodesAnimation(path, sliderVal, sliderType, shorstPathExist,  speed) {
    let value;
    if(shorstPathExist){
        value = sliderVal;
    } else{
        value = 200 / path.length;
    }
     
    return new Promise((resolve, reject) => {
        function timeout(array, v) {
            setTimeout(function () {
                if (array.length === 0) {
                    resolve();
                    return v;
                }
                if (array[0] !== undefined) {
                    changeToVisitedNode(array[0]);
                }
                array.shift();
                document.getElementById(sliderType).value = `${v}`;
                timeout(array, v+=value);
            }, speed);        
        }
        timeout(path, value);      
    });
};

export async function shortestPathNodesAnimation(bfsArr, shortArr,sliderType, speed) {
    let value = 200 / (bfsArr.length + shortArr.length);
    let bfsval = value * bfsArr.length;
    await visitedNodesAnimation(bfsArr, value, sliderType, true, speed);
    return new Promise((resolve, reject) =>{
        function timeout(arr, v) {
            setTimeout(function () {
                document.getElementById(sliderType).value = `${v}`;
                if (arr.length === 0) {
                    resolve();
                    return;
                }
                if (arr[arr.length - 1] !== null) {
               
                    changeToPathNode(arr[arr.length - 1]);
                    arr.pop();
                    
                    timeout(arr, v+=value);
                }
            }, 60);
        }
        timeout(shortArr, bfsval);
    }); 
};


