
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




export {
    changeColor,
    elementAtIndex,
    resolveTemp
}
