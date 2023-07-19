import {
  addClass,
  changeColor,
  closeMenu,
  elementAtIndex,
  notifySuccess,
  openMenu,
  removeClass,
  resolveTemp,
  swap,
  setDesc,
} from "./helper.js";

let observer = new ResizeObserver(() => {
  factor = graph_container.getBoundingClientRect().width / 21;
  console.log(factor);
});

observer.observe(document.body);

function drawBars() {
  console.log(array);
  array.forEach((e, index) => {
    let container = document.createElement("div");
    let bar = document.createElement("div");
    let legend = document.createElement("p");
    container.setAttribute("class", "container");
    container.style.transform = `translateX(${index * factor}px)`;
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
  setDesc("insertion");
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
        elementAtIndex(j).style.transform = `translateX(${(j + 1) * factor}px)`;
        elementAtIndex(j).dataset.temp = j + 1;
        array[j + 1] = array[j];
        console.log(i, j, array);
        j--;
      } else {
        addClass(i, "key");
        changeColor(i, "#fffd8e");
        elementAtIndex(i).style.transform = `translateX(${(j + 1) * factor}px)`;
        elementAtIndex(i).dataset.temp = j + 1;
        console.log(i, j, array);
        resolveTemp();
        array[j + 1] = key;
        i++;
        j = i - 1;
        key = array[i];
      }
    } else {
      notifySuccess();
      clearInterval(mainInterval);
    }
  }, 500);
}

function bubbleSort() {
  console.log("starting bubble sort");
  let i = 0;
  let j = 0;
  let swapped = false;
  setDesc("bubble");
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
          notifySuccess();
          console.log("no swap : clearing interval");
          clearInterval(mainInterval);
        }
        i++;
        j = 0;
        swapped = false;
      }
    } else {
      notifySuccess();
      console.log("loop end : clearing interval");
      clearInterval(mainInterval);
    }
  }, 300);
}

function selectionSort() {
  let i = 0;
  let j = i + 1;
  let min_indx = i;
  setDesc("selection");
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
      notifySuccess();
      clearInterval(mainInterval);
    }
  }, 300);
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
    }, 100);
  });
}
async function quickSort(left, right) {
  if (left < right) {
    let pi = await partition(left, right);
    await quickSort(left, pi - 1);
    await quickSort(pi + 1, right);
    await new Promise((res) => {
      [...graph_container.children].forEach((e, index) => {
        removeClass(index, "start");
        removeClass(index, "end");
        changeColor(index, "#a18eff");
      });
      res("done");
    });
  }
}

async function merge(left, mid, right) {
  [...graph_container.children].forEach((e, index) => {
    index >= left && index <= right
      ? changeColor(index, "#a18eff")
      : changeColor(index, "#242424");
  });

  var n1 = mid - left + 1;
  var n2 = right - mid;

  var L = new Array(n1);
  var R = new Array(n2);

  for (var i = 0; i < n1; i++) L[i] = array[left + i];
  for (var j = 0; j < n2; j++) R[j] = array[mid + 1 + j];

  var i = 0;

  var j = 0;

  var k = left;

  i = 0;
  j = 0;
  await new Promise((res) => {
    mainInterval = setInterval(() => {
      [...graph_container.children].forEach((e, index) => {
        index >= left && index <= right
          ? changeColor(index, "#a18eff")
          : changeColor(index, "#242424");
      });
      console.log("main loop", i, j, array);
      if (i < n1 && j < n2) {
        if (L[i] < R[j]) {
          array[k] = L[i];
          console.log("i :", i);
          changeColor(left + i, "#fffd8e");
          elementAtIndex(
            left + i
          ).style.transform = `translateY(40vh) translateX(${k * factor}px)`;
          elementAtIndex(left + i).dataset.temp = k;
          i++;
        } else {
          array[k] = R[j];
          console.log("j :", j);
          changeColor(mid + 1 + j, "#fffd8e");
          elementAtIndex(
            mid + 1 + j
          ).style.transform = `translateY(40vh) translateX(${k * factor}px)`;
          elementAtIndex(mid + 1 + j).dataset.temp = k;
          j++;
        }

        k++;
      } else {
        clearInterval(mainInterval);
        res("done");
      }
    }, 100);
  });

  await new Promise((res) => {
    mainInterval = setInterval(() => {
      [...graph_container.children].forEach((e, index) => {
        index >= left && index <= right
          ? changeColor(index, "#a18eff")
          : changeColor(index, "#242424");
      });
      console.log("left loop", i, j, array);
      if (i < n1) {
        console.log("i:", elementAtIndex(i));
        array[k] = L[i];
        changeColor(left + i, "#fffd8e");
        elementAtIndex(
          left + i
        ).style.transform = `translateY(40vh) translateX(${k * factor}px)`;
        elementAtIndex(left + i).dataset.temp = k;
        i++;
        k++;
      } else {
        clearInterval(mainInterval);
        res("done");
      }
    }, 100);
  });

  await new Promise((res) => {
    mainInterval = setInterval(() => {
      [...graph_container.children].forEach((e, index) => {
        index >= left && index <= right
          ? changeColor(index, "#a18eff")
          : changeColor(index, "#242424");
      });
      console.log("right loop", i, j, array);
      if (j < n2) {
        console.log("j:", elementAtIndex(j));
        array[k] = R[j];
        changeColor(mid + 1 + j, "#fffd8e");
        elementAtIndex(
          mid + 1 + j
        ).style.transform = `translateY(40vh) translateX(${k * factor}px)`;
        elementAtIndex(mid + 1 + j).dataset.temp = k;
        j++;
        k++;
      } else {
        clearInterval(mainInterval);
        res("done");
      }
    }, 100);
  });
  resolveTemp();
  [...graph_container.children].forEach((_, index) => {
    changeColor(index, "#a18eff");
  });
}
async function mergeSort(left, right) {
  console.log(left, right);
  if (left < right) {
    await new Promise(async (res) => {
      let m = Math.floor((left + right) / 2);
      await mergeSort(left, m);
      await mergeSort(m + 1, right);
      await merge(left, m, right);
      res("done");
    });
  }
}

function randomArray(length) {
  // graph_container.style.width = `${numberOfElements * 30}px`;
  // graph_container.style.height = `300px`;
  clearInterval(mainInterval);
  [...graph_container.children].forEach((e) => {
    graph_container.removeChild(e);
  });
  array = new Array(length).fill(0);
  array.forEach((_, index) => (array[index] = Math.floor(Math.random() * 100)));
  drawBars();
}

toggleButton.addEventListener("click", () => {
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

randomButton.addEventListener("click", () => {
  randomArray(numberOfElements);
});
runButton.addEventListener("click", async () => {
  let algo = new FormData(form).get("algo");

  switch (algo) {
    case "insertion":
      insertionSort();
      break;
    case "bubble":
      bubbleSort();
      break;
    case "selection":
      selectionSort();
      break;
    case "quick":
      setDesc("quick");
      await quickSort(0, array.length - 1);
      notifySuccess();
      break;
    case "merge":
      setDesc("merge");
      graph_container.style.transform = "translateY(-100px)";
      await mergeSort(0, array.length - 1);
      [...graph_container.children].forEach((e) => {
        e.style.transform = `translateX(${e.dataset.pos * factor}px)`;
      });
      notifySuccess();
      graph_container.style.transform = "translateY(0px)";
      break;
  }
});
