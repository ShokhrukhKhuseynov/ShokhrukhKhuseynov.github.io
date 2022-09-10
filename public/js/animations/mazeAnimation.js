import { changeToWallNode, changeToUnvisitedNode } from "../elementsClassChanger.js";
export function wallsAnimation(path) {

   return new Promise((resolve, reject) =>{

    function timeout(array) {
        setTimeout(function () {
            if (array.length === 0) {
                resolve();
                return;
            }
            if (array[0] !== undefined) {
                changeToWallNode(array[0]);
            }
            array.shift();
            timeout(array);
        }, 15);
    }
    timeout(path);
   }); 
};

export function unvisitedAnimation(path) {

    return new Promise((resolve,reject) =>{
        function timeout(array) {
            setTimeout(function () {
                if (array.length === 0) {
                    resolve();
                    return;
                }
                if (array[0] !== undefined) {
                    changeToUnvisitedNode(array[0]);
                }
                array.shift();
                timeout(array);
            }, 15);
        }
        timeout(path);
    });
}

