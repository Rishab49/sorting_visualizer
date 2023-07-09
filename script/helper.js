function changeColor(index, color) {
  elementAtIndex(index).children[0].style.backgroundColor = color;
}

function elementAtIndex(index) {
  return document.querySelector(`[data-pos="${index}"]`);
}
function resolveTemp() {
  [...document.querySelectorAll(".container")].forEach((e) => {
    e.dataset.pos = e.dataset.temp;
  });
}
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


function verticalSwap(i,j){
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

function addClass(item, className) {
  if (typeof item == "number") {
    elementAtIndex(item).children[0].classList.add(className);
  } else {
    item.children[0].classList.add(className);
  }
}
function removeClass(item, className) {
  if (typeof item == "number") {
    elementAtIndex(item).children[0].classList.remove(className);
  } else {
    item.children[0].classList.remove(className);
  }
}

function notifySuccess(){
  notificationElement.classList.add("slideIn");
  setTimeout(() =>  notificationElement.classList.remove("slideIn"),1000);
}

function closeMenu(){
  menu.style.right = "-250px";
  toggleButton.style.right = "0";
  isOpen = false;
}
function openMenu(){
  menu.style.right = "250px";
  toggleButton.style.right = "250px";
  isOpen = true;
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
  openMenu,
  closeMenu
};
