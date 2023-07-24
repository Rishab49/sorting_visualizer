import {
  closeMenu,
  drawBars,
  notifyError,
  notifySuccess,
  openMenu,
  setDesc,
} from "./helper.js";
import { insertionSort } from "../algo/insertion.js";
import { bubbleSort } from "../algo/bubble.js";
import { selectionSort } from "../algo/selection.js";
import { mergeSort } from "../algo/merge.js";
import { quickSort } from "../algo/quick.js";


// function to randomize the array
function randomArray(length) {
  clearInterval(mainInterval);
  [...graph_container.children].forEach((e) => {
    graph_container.removeChild(e);
  });
  array = new Array(length).fill(0);
  array.forEach((_, index) => (array[index] = Math.floor(Math.random() * 100)));
  drawBars();
}

// menu toggle button event
toggleButton.addEventListener("click", () => {
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});


// randomize button event
randomButton.addEventListener("click", () => {
  randomArray(numberOfElements);
  isSorted = false;
});

// Run Algo button event
runButton.addEventListener("click", async () => {
  if (isSorted) {
    notifyError("Already Sorted");
  } else {
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
        isSorted = true;
        break;
      case "merge":
        setDesc("merge");
        graph_container.style.transform = "translateY(-100px)";
        await mergeSort(0, array.length - 1);
        [...graph_container.children].forEach((e) => {
          e.style.transform = `translateX(${e.dataset.pos * factor}px)`;
        });
        notifySuccess();
        isSorted = true;
        graph_container.style.transform = "translateY(0px)";
        break;
    }
  }
});


// interval timing button event 
interval_element.addEventListener("input", () => {
  interval = Number(interval_element.value);
  console.log(interval_element.value);
});

// observer to change the factor whenever size of body changes
let observer = new ResizeObserver(() => {
  factor = graph_container.getBoundingClientRect().width / 21;
  console.log(factor);
});

observer.observe(document.body);

// theme toggle button event
theme_button.addEventListener("change", () => {

  // when it is dark mode
  if (isDark) {
    document.querySelector(":root").style.colorScheme = "light";
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    document.querySelector(".menu").style.backgroundColor = "white";
  }
  
  // when it is not
  else {
    document.querySelector(":root").style.colorScheme = "dark";
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    document.querySelector(".menu").style.backgroundColor = "#1c1b22";
  }

  isDark = !isDark;
});
