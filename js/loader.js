var div = document.createElement('div');
div.id = 'preloader';
div.className = 'preloader';
div.innerHTML = '<div class="load"></div><div class="loader"></div>';
document.body.insertBefore(div, document.body.firstChild);
window.onload = function () {
  // setTimeout(() => {

  document.getElementById('preloader').classList.add('off');
  // }, 10000);
};

// ======================== menu animation ===========================
const menu_input = document.querySelector('#menu-icon');
const menu_ul = document.querySelector('.menu');
const navbar=document.querySelector('nav')
console.log(navbar)

menu_input.addEventListener('click', toggle);

function toggle() {
  if (menu_input.checked == true) {
    navbar.style.zIndex=9
    menu_ul.style.animation = 'slide .5s ease-out forwards';
  } else {
    menu_ul.style.animation = 'slideback .5s ease-out';
    setTimeout(() => {
      
      navbar.style.zIndex=0
    },500);
  }
}
