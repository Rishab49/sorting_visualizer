// function to change the color of bars
function changeColor(index, color) {
  elementAtIndex(index).children[0].style.backgroundColor = color;
}

// function to select bar element at a particular index 
function elementAtIndex(index) {
  return document.querySelector(`[data-pos="${index}"]`);
}

// setting the pos attribute equal to the temp 
// attribute of the bar element
function resolveTemp() {
  [...document.querySelectorAll(".container")].forEach((e) => {
    e.dataset.pos = e.dataset.temp;
  });
}

// function to swap 2 bar elements
function swap(j, i) {
  const firstElem = elementAtIndex(j);
  const secondElem = elementAtIndex(i);
  firstElem.children[0].style.backgroundColor = "#fffd8e";
  secondElem.children[0].style.backgroundColor = "#fffd8e";
  firstElem.style.transform = `translateX(${i * factor}px)`;
  secondElem.style.transform = `translateX(${j * factor}px)`;
  firstElem.dataset.pos = i;
  secondElem.dataset.pos = j;
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

// function to vartically swap two elements
function verticalSwap(i, j) {
  const firstElem = elementAtIndex(j);
  const secondElem = elementAtIndex(i);
  firstElem.children[0].style.backgroundColor = "#fffd8e";
  secondElem.children[0].style.backgroundColor = "#fffd8e";
  firstElem.style.transform = `translateY(400px) translateX(${i * factor}px)`;
  secondElem.style.transform = `translateY(400px) translateX(${j * factor}px)`;
  firstElem.dataset.pos = i;
  secondElem.dataset.pos = j;
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

// function to add class to a particular element
function addClass(item, className) {
  if (typeof item == "number") {
    elementAtIndex(item).children[0].classList.add(className);
  } else {
    item.children[0].classList.add(className);
  }
}

// function to remove class from a particular element
function removeClass(item, className) {
  if (typeof item == "number") {
    elementAtIndex(item).children[0].classList.remove(className);
  } else {
    item.children[0].classList.remove(className);
  }
}

// function to notify success of sorting completion
function notifySuccess() {
  notificationElement.innerText = "Sorting Completed";
  notificationElement.classList.add("slideIn");
  setTimeout(() => notificationElement.classList.remove("slideIn"), 1000);
}


// function to notify some error
function notifyError(msg){
  notificationElement.innerText = msg;
  notificationElement.classList.add("slideIn");
  setTimeout(() => notificationElement.classList.remove("slideIn"), 1000);
}

// function to close menu
function closeMenu() {
  menu.style.right = "-250px";
  toggleButton.style.right = "0";
  isOpen = false;
}

// function to open menu
function openMenu() {
  menu.style.right = "250px";
  toggleButton.style.right = "250px";
  isOpen = true;
}

// function to change the description of desc element
function setDesc(type) {
  desc_container.querySelector("h1").innerText = algo_meta_data[type].name;
  desc_container.querySelector("p").innerText = algo_meta_data[type].data;
  desc_container.querySelector(".time").innerText = `time : ${algo_meta_data[type].time}`;
  desc_container.querySelector(".space").innerText = `space : ${algo_meta_data[type].space}`;
}

// Drawing Graph bars
function drawBars() {
  console.log(array);
  array.forEach((e, index) => {
    let container = document.createElement("div");
    let bar = document.createElement("div");
    let legend = document.createElement("p");

    // setting properties of each bar container
    container.setAttribute("class", "container");
    container.style.transform = `translateX(${index * factor}px)`;
    container.dataset.pos = index;
    container.dataset.temp = index;

    // setting property of bar
    bar.setAttribute("class", "bar");
    bar.style.height = `${e}%`;

    // assigning random number to each bar
    legend.innerText = e;

    // appending bar and random number to bar container
    container.appendChild(bar);
    container.appendChild(legend);

    // appending bar container to graph container
    graph_container.appendChild(container);
  });
}

export {
  changeColor,
  elementAtIndex,
  resolveTemp,
  swap,
  addClass,
  removeClass,
  verticalSwap,
  notifySuccess,
  notifyError,
  openMenu,
  closeMenu,
  setDesc,
  drawBars
};
