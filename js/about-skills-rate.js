

const canvas = document.querySelectorAll('.mycanvas');

canvas.forEach((canvas) => {
  const context = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 55;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.lineWidth = 9;
  context.strokeStyle = '#eee';
  context.stroke();
});

let deg = 270;
let radian = 0;
let rate = 0;

let checkTime = 0;

let interval = setInterval(function () {
  animate(1.1, 0);
}, 6);
let interval2 = setInterval(function () {
  animate(1.1, 1);
}, 6);
let interval3 = setInterval(function () {
  animate(1.25, 2);
}, 6);
let interval4 = setInterval(function () {
  animate(1.2, 3);
}, 6);

let interval5;
let interval6;
let interval7;
let interval8;

// if (scroll == 100) {
interval5 = setInterval(function () {
  animate(1.35, 4);
}, 6);
interval6 = setInterval(function () {
  animate(1.17, 5);
}, 6);
interval7 = setInterval(function () {
  animate(1, 6);
}, 6);
interval8 = setInterval(function () {
  animate(1.1, 7);
}, 6);

// }

//    ==================toRadian===================
function toradian(deg) {
  return (deg * Math.PI) / 180;
}

//    =======================Loading===============================


function animate(degArray, i) {
  deg += degArray;
  radian = toradian(deg);
  const context = canvas[i].getContext('2d');
  const centerX = canvas[i].width / 2;
  const centerY = canvas[i].height / 2;
  const radius = 55;
  context.beginPath();
  context.arc(centerX, centerY, radius, 1.5 * Math.PI, radian, false);
  context.lineWidth = 9;
  context.strokeStyle = '#72B626';
  context.stroke();

  //    ======================

  checkTime++;
  if (checkTime === 3) {
    rate++;
    context.font = 'normal 24px sans-serif';
    context.fillStyle = '#666';
    context.textAlign = 'center';
    context.clearRect(50, 50, 40, 40);
    context.fillText(rate, 68, 82);

    checkTime = 0;
  }
  switch (rate) {
    case 95:
      clearInterval(interval4);

      break;
    case 80:
      clearInterval(interval3);

      break;
    case 70:
      clearInterval(interval6);

      break;
    case 60:
      clearInterval(interval2);

      break;
    case 50:
      clearInterval(interval);
      clearInterval(interval5);
      break;
    case 20:
      clearInterval(interval8);

      break;
    case 10:
      clearInterval(interval7);

      break;
  }
}




// *********************************************************
// function resize(){    
//   $(".mycanvas").outerHeight($(window).height()-$(".mycanvas").offset().top- Math.abs($(".mycanvas").outerHeight(true) - $(".mycanvas").outerHeight()));
// }
// $(document).ready(function(){
//   resize();
//   $(window).on("resize", function(){                      
//     resize();
//   });
// })