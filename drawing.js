console.log("Hello, World")

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

resize();

function resize() {
  ctx.canvas.width = 500;
  ctx.canvas.height = 500;
}
function reposition(event) {
  // canvas is off set by left margin of wrapper and height of div.title, top and bottom margin of .div.title and top .wrapper
  // we have to get left margin (since its in vw)of the wrapper through the rendered style of the window

  let canvasOffsetLeft = window.getComputedStyle(document.getElementById("wrapperId"));
  let l = canvasOffsetLeft.marginLeft; 
  // convert l to number so I can substract
  coord.x = event.clientX - l.match(/\d+/)[0];

  // the top I get from several elements:
  // topmargin of div.title + height of div.title + bottom margin of div.title + top margin of div.wrapper
  coord.y = event.clientY - 230;
}
function start(event) {
  document.addEventListener("mousemove", draw);
  reposition(event);
}
function stop() {
  document.removeEventListener("mousemove", draw);
}
function draw(event) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000000";
  ctx.moveTo(coord.x, coord.y);
  reposition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}

document.addEventListener("keydown", function(event){ 
  console.log(event);
  console.log("what did we just press:")
  console.log(event.key)

  // Check if the key we pressed is the 0 key
  // clear the canvas 
  if (event.key == "0"){
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
  }  
  if (event.key == "Enter"){
    let letterTraced = document.getElementById("letterTraced");
    letterTraced.innerHTML = "a"; 
  }  
})
