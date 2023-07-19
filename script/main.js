// Global Variables
let array;
let mainInterval;
let numberOfElements = 20;
let isOpen = false;
let factor;

let graph_container = document.querySelector(".graph_container");
let randomButton = document.querySelector("#randomButton");
let runButton = document.querySelector(".run_button");
let form = document.querySelector("form");
let notificationElement = document.querySelector(".notification");
let toggleButton = document.querySelector(".toggle");
let menu = document.querySelector(".menu");
let desc_container = document.querySelector(".desc_container");
let algo_meta_data = {
  insertion: {
    name: "Insertion Sort",
    data: `Insertion sort is a simple sorting algorithm that works by repeatedly inserting the next element into the correct position in the already sorted part of the array. The algorithm starts with the first element in the array and compares it to the element before it. If the first element is smaller than the element before it, then the two elements are swapped. The algorithm then continues to the next element in the array and repeats the process.

        The time complexity of insertion sort depends on the order of the elements in the array. In the best case, the array is already sorted, so the algorithm only needs to scan the entire array once. This gives a time complexity of O(n). In the worst case, the array is in reverse order, so the algorithm needs to compare each element to every other element in the array.`,
    time: "O(n^2)",
    space: "O(1)",
  },
  bubble: {
    name: "Bubble Sort",
    data: `Bubble sort is a simple sorting algorithm that works by repeatedly comparing adjacent elements in an array and swapping them if they are in the wrong order. The algorithm starts at the beginning of the array and compares the first two elements. If the first element is greater than the second element, then the two elements are swapped. The algorithm then moves on to the next two elements and repeats the process. This continues until the end of the array is reached.

    The time complexity of bubble sort depends on the order of the elements in the array. In the best case, the array is already sorted, so the algorithm only needs to scan the entire array once. This gives a time complexity of O(n). In the worst case, the array is in reverse order, so the algorithm needs to compare each element to every other element in the array. `,
    time: "O(n^2)",
    space: "O(1)",
  },
  selection: {
    name: "Selection Sort",
    data: `Sure, here is a short note on selection sort with its time complexity and space complexity:

    Selection sort is a sorting algorithm that works by repeatedly finding the minimum element in the unsorted portion of the array and swapping it with the first unsorted element. The algorithm starts at the beginning of the array and finds the minimum element. The minimum element is then swapped with the first element in the array. The algorithm then moves on to the next element in the array and repeats the process. This continues until the entire array is sorted.
    
    The time complexity of selection sort depends on the order of the elements in the array. In the best case, the array is already sorted, so the algorithm only needs to scan the entire array once. This gives a time complexity of O(n). In the worst case, the array is in reverse order, so the algorithm needs to compare each element to every other element in the array.`,
    time: "O(n^2)",
    space: "O(1)",
  },
  quick: {
    name: "Quick Sort",
    data: `Sure, here is a short note on quick sort with its time complexity and space complexity:

    Quick sort is a divide-and-conquer sorting algorithm that works by repeatedly partitioning the array around a pivot element. The pivot element is chosen randomly or using some other heuristic. The algorithm then recursively sorts the smaller and larger subarrays around the pivot element.
    
    The time complexity of quick sort depends on the order of the elements in the array and the way the pivot element is chosen. In the best case, the pivot element is chosen such that the array is always split into two equal-sized subarrays. This gives a time complexity of O(n log n). In the worst case, the pivot element is always the smallest or largest element in the array. `,
    time: "O(n^2)",
    space: "O(log n)",
  },
  merge: {
    name: "Merge Sort",
    data: `Merge sort is a divide-and-conquer sorting algorithm that works by recursively splitting the array in half and then merging the sorted halves back together. The algorithm starts by splitting the array in half. It then recursively sorts the two halves and then merges the sorted halves back together.

    The time complexity of merge sort is O(n log n) in all cases. This is because the algorithm always splits the array in half, and the merging step takes a constant amount of time.`,
    time: "O(n log n)",
    space: "O(n)",
  },
};

factor = graph_container.getBoundingClientRect().width / 21;
