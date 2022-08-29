
import { changeToVisitedNodeWithSlider, changeToPathNodeWithSlider } from "../elementsClassChanger.js";
export async function shortestPathAnimationSlider(bfsArr, shortArr, currentSliderVal, shorstPathExist) {
    let maxIterationValue;
    if(shorstPathExist){
        maxIterationValue = Math.floor(((bfsArr.length + shortArr.length) * currentSliderVal) / 200);
    }else{
        maxIterationValue = Math.floor((bfsArr.length * currentSliderVal) / 200);
    }
    for (let i = 0; i < maxIterationValue; i++) {
        if (bfsArr.length !== 0) {
            if (bfsArr[0] !== null) {
                changeToVisitedNodeWithSlider(bfsArr[0]);
                
            }
            bfsArr.shift();
        }
        if (bfsArr.length === 0) {
            if ((shortArr[shortArr.length - 1] !== null && shortArr[shortArr.length - 1] !== undefined) || shortArr[shortArr.length - 1] === 0) {
                changeToPathNodeWithSlider(shortArr[shortArr.length - 1]);

            }
            shortArr.pop();
        }
        
    }
};

