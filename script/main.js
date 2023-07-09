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

factor = graph_container.getBoundingClientRect().width / 21;
