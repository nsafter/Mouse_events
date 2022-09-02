let gui = document.getElementById("control");
let opendiv = document.getElementById("controlopen");
let closediv = document.getElementById("controlclose");

opendiv.addEventListener("click", () => {
  gui.style.display = "block";
  closediv.style.display = "block";
});

closediv.addEventListener("click", () => {
  gui.style.display = "none";
  closediv.style.display = "none";
});

let slider1 = document.getElementById("rangex");
let slider2 = document.getElementById("rangey");
let slider3 = document.getElementById("rangez");

let slider1val = document.getElementById("slider1val");
let slider2val = document.getElementById("slider2val");
let slider3val = document.getElementById("slider3val");

slider1val.innerHTML = slider1.value;
slider2val.innerHTML = slider2.value;
slider3val.innerHTML = slider3.value;

slider1.oninput = function () {
  slider1val.innerHTML = slider1.value;
};

slider2.oninput = function () {
  slider2val.innerHTML = slider2.value;
};

slider3.oninput = function () {
  slider3val.innerHTML = slider3.value;
};
