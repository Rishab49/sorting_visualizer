import {
  addClass,
  elementAtIndex,
  notifySuccess,
  removeClass,
  setDesc,
  swap,
} from "../script/helper.js";


// selection sort function
export function selectionSort() {

  // initializing the required variables
  let i = 0;
  let j = i + 1;
  let min_indx = i;
  setDesc("selection");

  // starting the animation
  mainInterval = setInterval(() => {
    console.log(i, j, array);

    // resetting the styles
    [...graph_container.children].forEach((e) => {
      e.children[0].style.backgroundColor = "#a18eff";
      removeClass(e, "key");
    });

    // checking if i does not reach the end of array
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
      isSorted = true;
      clearInterval(mainInterval);
    }
  }, interval);
}
