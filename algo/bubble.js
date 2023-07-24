import { 
  notifySuccess, 
  setDesc, 
  swap 
} from "../script/helper.js";

// bubble sort function
export function bubbleSort() {
  console.log("starting bubble sort");

  // intitializing the loop variables
  let i = 0;
  let j = 0;
  let swapped = false;

  // setting the description of desc_container
  // equal to bubble sort description
  setDesc("bubble");

  // setting the setInterval equal to mainInterval(variable)
  // and starting the animation

  mainInterval = setInterval(() => {
    // looping each bar element to reset
    // the background-color
    [...graph_container.children].forEach((e) => {
      e.children[0].style.backgroundColor = "#a18eff";
    });

    // checking if i is smaller than the
    // length of array
    if (i < array.length - 1) {
      if (j < array.length - i - 1) {
        if (array[j] > array[j + 1]) {
          console.log(i, j, array);

          // swapping element at j with element at j + 1
          swap(j, j + 1);
          swapped = true;
        }
        j++;
      } else {
        if (swapped == false) {
          // displaying success notification
          notifySuccess();

          console.log("no swap : clearing interval");

          // stopping the animation
          clearInterval(mainInterval);

          isSorted = true;
        }
        i++;
        j = 0;
        swapped = false;
      }
    }

    // if i is bigger than the array length
    else {
      // displaying success notification
      notifySuccess();

      console.log("loop end : clearing interval");

      // stopping the animation
      clearInterval(mainInterval);

      isSorted = true;
    }
  }, interval);
}
