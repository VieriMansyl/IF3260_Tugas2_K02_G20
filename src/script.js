let canvas = document.querySelector("#canvas");
let gl = canvas.getContext("webgl");




// help handler
const helpbtn = document.querySelector("#help");
helpbtn.addEventListener("click", () => {
  document.querySelector("#help-container").style.display = "inline";
});

const closebtn = document.querySelector("#close");
closebtn.addEventListener("click", () => {
  document.querySelector("#help-container").style.display = "none";
});