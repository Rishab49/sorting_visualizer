import { changeColor, elementAtIndex, resolveTemp } from "./helper.js";

let graph_container = document.querySelector(".graph_container");
let array;
let mainInterval;
let numberOfElements = 20;
let insertionButton = document.querySelector("#insertionButton");
let randomButton = document.querySelector("#randomButton");
function drawBars() {

    console.log(array);
    array.forEach((e, index) => {
        let container = document.createElement("div");
        let bar = document.createElement("div");
        let legend = document.createElement("p");
        container.setAttribute("class", "container");
        container.style.transform = `translateX(${(index) * 30}px)`;
        container.dataset.pos = index;
        container.dataset.temp = index;
        bar.setAttribute("class", "bar");
        bar.style.height = `${e}%`;
        legend.innerText = e;
        container.appendChild(bar);
        container.appendChild(legend);
        graph_container.appendChild(container);

    })
}

function insertionSort() {
    let i = 1;
    let key = array[i];
    let j = i - 1;
    mainInterval = setInterval(() => {

        [...graph_container.children].forEach(e => { 
            e.children[0].style.backgroundColor = "#a18eff"; 
            e.children[0].classList.remove("key") 
        });

        if (i < array.length) {
            if (j >= 0 && array[j] > key) {
                changeColor(j,"#fffd8e");
                changeColor(i,"#f93c3c");
                elementAtIndex(i).children[0].classList.add("key") 
                elementAtIndex(j).style.transform = `translateX(${(j + 1) * 30}px)`;
                elementAtIndex(j).dataset.temp = j + 1;
                array[j + 1] = array[j];
                console.log(i, j, array);
                j--;
            } else {
                elementAtIndex(i).children[0].classList.add("key");
                changeColor(i,"#fffd8e");
                elementAtIndex(i).style.transform = `translateX(${(j + 1) * 30}px)`;
                elementAtIndex(i).dataset.temp = j + 1;
                console.log(i, j, array);
                resolveTemp();
                array[j + 1] = key;
                i++;
                j = i - 1;
                key = array[i];
            }
        } else {
            clearInterval(mainInterval);
        }
    }, 500);

}

function randomArray(length) {
    graph_container.style.width = `${numberOfElements * 30}px`;
    clearInterval(mainInterval);
    [...graph_container.children].forEach(e => {
        graph_container.removeChild(e);
    })
    array = new Array(length).fill(0);
    array.forEach((_, index) => array[index] = Math.floor(Math.random() * 100));
    drawBars();
}


randomButton.addEventListener("click",() => randomArray(numberOfElements));
insertionButton.addEventListener("click",() => insertionSort());