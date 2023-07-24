import {
  addClass,
  changeColor,
  elementAtIndex,
  notifySuccess,
  removeClass,
  resolveTemp,
  setDesc,
} from "../script/helper.js";

// insertion sort function
export function insertionSort() {

  // initializing variables of controlled lop
  let i = 1;
  let key = array[i];
  let j = i - 1;

  // setting the description containers content equal to
  // insertion sorts description
  setDesc("insertion");

  // running the controlled loop
  mainInterval = setInterval(() => {

    // resetting the style of bar equal to default
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

      // displaying success notification
      notifySuccess();

      isSorted = true;
      
      // stopping the animation
      clearInterval(mainInterval);

    }
  }, interval);
}
