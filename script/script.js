import {
  addClass,
  changeColor,
  elementAtIndex,
  removeClass,
  resolveTemp,
  swap,
} from "./helper.js";

let graph_container = document.querySelector(".graph_container");
let insertionButton = document.querySelector("#insertionButton");
let bubbleButton = document.querySelector("#bubbleButton");
let randomButton = document.querySelector("#randomButton");
let selectionButton = document.querySelector("#selectionButton");
let quickButton = document.querySelector("#quickButton");

function drawBars() {
  console.log(array);
  array.forEach((e, index) => {
    let container = document.createElement("div");
    let bar = document.createElement("div");
    let legend = document.createElement("p");
    container.setAttribute("class", "container");
    container.style.transform = `translateX(${index * 30}px)`;
    container.dataset.pos = index;
    container.dataset.temp = index;
    bar.setAttribute("class", "bar");
    bar.style.height = `${e}%`;
    legend.innerText = e;
    container.appendChild(bar);
    container.appendChild(legend);
    graph_container.appendChild(container);
  });
}

function insertionSort() {
  let i = 1;
  let key = array[i];
  let j = i - 1;
  mainInterval = setInterval(() => {
    [...graph_container.children].forEach((e) => {
      e.children[0].style.backgroundColor = "#a18eff";
      removeClass(e, "key");
    });

    if (i < array.length) {
      if (j >= 0 && array[j] > key) {
        changeColor(j, "#fffd8e");
        changeColor(i, "#f93c3c");
        addClass(i, "key");
        elementAtIndex(j).style.transform = `translateX(${(j + 1) * 30}px)`;
        elementAtIndex(j).dataset.temp = j + 1;
        array[j + 1] = array[j];
        console.log(i, j, array);
        j--;
      } else {
        addClass(i, "key");
        changeColor(i, "#fffd8e");
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

function bubbleSort() {
  console.log("starting bubble sort");
  let i = 0;
  let j = 0;
  let swapped = false;
  mainInterval = setInterval(() => {
    [...graph_container.children].forEach((e) => {
      e.children[0].style.backgroundColor = "#a18eff";
    });
    if (i < array.length - 1) {
      if (j < array.length - i - 1) {
        if (array[j] > array[j + 1]) {
          console.log(i, j, array);
          swap(j, j + 1);
          swapped = true;
        }
        j++;
      } else {
        if (swapped == false) {
          console.log("no swap : clearing interval");
          clearInterval(mainInterval);
        }
        i++;
        j = 0;
        swapped = false;
      }
    } else {
      console.log("loop end : clearing interval");
      clearInterval(mainInterval);
    }
  }, 300);
}

function selectionSort() {
  let i = 0;
  let j = i + 1;
  let min_indx = i;

  mainInterval = setInterval(() => {
    console.log(i, j, array);
    [...graph_container.children].forEach((e) => {
      e.children[0].style.backgroundColor = "#a18eff";
      removeClass(e, "key");
    });
    if (i < array.length - 1) {
      elementAtIndex(i).children[0].style.backgroundColor = "#fffd8e";
      addClass(i, "key");
      if (j < array.length) {
        elementAtIndex(j).children[0].style.backgroundColor = "#f93c3c";
        if (array[j] < array[min_indx]) {
          min_indx = j;
        }
        j++;
      } else {
        if (min_indx != i) {
          swap(i, min_indx);
        }
        i++;
        j = i + 1;
        min_indx = i;
      }
    } else {
      clearInterval(mainInterval);
    }
  }, 100);
}

function partition(start, end) {
  let i = start - 1;
  let pivot = array[end];
  let j = start;
  console.log("partition starts", start, end);
  return new Promise((res) => {
    mainInterval = setInterval(() => {
      [...graph_container.children].forEach((e, index) => {
        index == start ? addClass(index, "start") : removeClass(index, "start");
        index == end ? addClass(index, "end") : removeClass(index, "end");
        index >= start && index <= end
          ? changeColor(index, "#a18eff")
          : changeColor(index, "#242424");
        changeColor(end, "yellow");
        changeColor(j, "#fffd8e");
      });

      console.log(i, j, array);
      if (j <= end - 1) {
        if (array[j] < pivot) {
          i++;
          swap(i, j);
        }
        j++;
      } else {
        console.log("end swap");
        swap(i + 1, end);
        clearInterval(mainInterval);
        res(i + 1);
      }
    }, 400);
  });
}
async function quickSort(left, right) {
  if (left < right) {
    let pi = await partition(left, right);
    await quickSort(left, pi - 1);
    await quickSort(pi + 1, right);
    await new Promise((res) => {
      [...graph_container.children].forEach((e, index) => {
        removeClass(index,"start");
        removeClass(index,"end");
        changeColor(index, "#a18eff");
      });
      res("done");
    });
  } else {
  }
}

function randomArray(length) {
  graph_container.style.width = `${numberOfElements * 30}px`;
  clearInterval(mainInterval);
  [...graph_container.children].forEach((e) => {
    graph_container.removeChild(e);
  });
  array = new Array(length).fill(0);
  array.forEach((_, index) => (array[index] = Math.floor(Math.random() * 100)));
  drawBars();
}

randomButton.addEventListener("click", () => randomArray(numberOfElements));
insertionButton.addEventListener("click", () => insertionSort());
bubbleButton.addEventListener("click", () => bubbleSort());
selectionButton.addEventListener("click", () => selectionSort());
quickButton.addEventListener("click", () => quickSort(0, array.length - 1));
