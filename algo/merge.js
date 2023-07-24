import { 
  changeColor, 
  elementAtIndex, 
  resolveTemp 
} from "../script/helper.js";

// function to run merge sort on a subarray
async function merge(left, mid, right) {
  [...graph_container.children].forEach((e, index) => {
    index >= left && index <= right
      ? changeColor(index, "#a18eff")
      : changeColor(index, "#a18eff52");
  });

  var n1 = mid - left + 1;
  var n2 = right - mid;

  // creating left and right arrays
  var L = new Array(n1);
  var R = new Array(n2);

  // assigning elements to left and right arrays
  for (var i = 0; i < n1; i++) L[i] = array[left + i];
  for (var j = 0; j < n2; j++) R[j] = array[mid + 1 + j];

  var i = 0;

  var j = 0;

  var k = left;

  i = 0;
  j = 0;

  // sorting the array until i < n1 && j < n2
  await new Promise((res) => {
    mainInterval = setInterval(() => {
      [...graph_container.children].forEach((e, index) => {
        index >= left && index <= right
          ? changeColor(index, "#a18eff")
          : changeColor(index, "#a18eff52");
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
    }, interval);
  });

  // assining reset of the elements to L to array
  await new Promise((res) => {
    mainInterval = setInterval(() => {
      [...graph_container.children].forEach((e, index) => {
        index >= left && index <= right
          ? changeColor(index, "#a18eff")
          : changeColor(index, "#a18eff52");
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
    }, interval);
  });

  // assining reset of the elements to R to array
  await new Promise((res) => {
    mainInterval = setInterval(() => {
      [...graph_container.children].forEach((e, index) => {
        index >= left && index <= right
          ? changeColor(index, "#a18eff")
          : changeColor(index, "#a18eff52");
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
    }, interval);
  });
  resolveTemp();
  [...graph_container.children].forEach((_, index) => {
    changeColor(index, "#a18eff");
  });
}

// merge sort function
export async function mergeSort(left, right) {
  console.log(left, right);

  // checking if there are elements to compare
  if (left < right) {
    await new Promise(async (res) => {
      let m = Math.floor((left + right) / 2);

      // sorting the left half of the array
      await mergeSort(left, m);

      // sorting the right half of the array
      await mergeSort(m + 1, right);

      // sorting the complete array
      await merge(left, m, right);
      res("done");
    });
  }
}
