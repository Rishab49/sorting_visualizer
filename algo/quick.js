import { 
  addClass, 
  changeColor, 
  removeClass, 
  swap 
} from "../script/helper.js";


// function to partition and sort the elements
function partition(start, end) {

  // initializing the required variables
  let i = start - 1;
  let pivot = array[end];
  let j = start;
  console.log("partition starts", start, end);
  return new Promise((res) => {

    // starting the main interval
    mainInterval = setInterval(() => {
      [...graph_container.children].forEach((e, index) => {
        index == start ? addClass(index, "start") : removeClass(index, "start");
        index == end ? addClass(index, "end") : removeClass(index, "end");
        index >= start && index <= end
          ? changeColor(index, "#a18eff")
          : changeColor(index, "#a18eff52");
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
    }, interval);
  });
}

// Quick sort function
export async function quickSort(left, right) {

  // checking if there are elements left to sort
  if (left < right) {
    let pi = await partition(left, right);

    // sorting the left half from middle
    await quickSort(left, pi - 1);

    // sorting the right half from tu=he middle
    await quickSort(pi + 1, right);

    // sorting completed resetting the styles of graph bars
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
