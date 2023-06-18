
function changeColor(index,color){
    elementAtIndex(index).children[0].style.backgroundColor = color;
}

function elementAtIndex(index){
    return document.querySelector(`[data-pos="${index}"]`);
}
function resolveTemp() {
    [...document.querySelectorAll(".container")].forEach(e => {
        e.dataset.pos = e.dataset.temp;
    })
}
function swap(j,i){

    const firstElem = elementAtIndex(j);
    const secondElem = elementAtIndex(i);
    firstElem.children[0].style.backgroundColor = "#fffd8e";
    secondElem.children[0].style.backgroundColor = "#fffd8e";
    firstElem.style.transform = `translateX(${(i) * 30}px)`;
    secondElem.style.transform = `translateX(${(j) * 30}px)`;
    firstElem.dataset.pos = i;
    secondElem.dataset.pos = j;
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;

}



export {
    changeColor,
    elementAtIndex,
    resolveTemp,
    swap
}
