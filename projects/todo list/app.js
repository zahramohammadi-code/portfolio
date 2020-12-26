// ====================== variable ======================
const task_input = document.querySelector('#task');
const desc_input = document.querySelector('#description');
const addBtn = document.querySelector('#add');

const noteContainer_div = document.querySelector('.note-container');

const task_div = document.querySelector('#tasklist');
const desc_div = document.querySelector('#descriptionlist');
const number_div = document.querySelector('#no');
const check_div = document.querySelector('#check');
const date_div = document.querySelector('#date');
const del_div = document.querySelector('#del');

// ====================== eventListener ======================

//------- click the button and create new row------
addBtn.addEventListener('click', () => {
  creatNewNote();
});
//--------- function remove notes-------
del_div.addEventListener('click', function (e) {
  removeTask(e);
});

// ------get data from localStorage on loaded-----
document.addEventListener('DOMContentLoaded', function () {
  localStorageOnload();
  

});



//======================== functions ==========================
let count = 1;
let num = 0;
//----------convert date number ----------
let persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ],
  arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

function fixNumbers(str) {
  if (typeof str === 'string') {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
}
//-------get new date---------
let now = new Date().toLocaleDateString('fa-IR');
let nowDate = fixNumbers(now);
// console.log(nowDate);

//------ add new note ---------
function creatNewNote() {
  //----- add new row----------
  if (task_input.value !== '' || desc_input.value !== '') {
    num++;


    task_div.innerHTML += `<div class='delete${num}'>${task_input.value}</div>`;
    desc_div.innerHTML += `<div class='delete${num}'>${desc_input.value}</div>`;
    number_div.innerHTML += `<div class='delete${num}'>${count++}</div>`;
    check_div.innerHTML += `<div class='delete${num}'><input type='checkbox' class="input" id="ch${num}" />
    <label class="label" for="ch${num}"></label></div>`;
    date_div.innerHTML += `<div class='delete${num}'>${nowDate}</div>`;
    del_div.innerHTML += `<div class='delete${num}'><i style='font-size:18px' class='fas del'>&#xf2ed;</i></div>`;
  }

  addToLocalStorage(task_input.value, desc_input.value, `ch${num}`);

  // ----- remove inputs value-------
  task_input.value = '';
  desc_input.value = '';
  task_input.focus();
}

//------- remove notes from list------------
function removeTask(e) {
  //
  let deleteItem;
  if (e.target.classList.contains('del')) {
    let clasname = e.target.parentElement.getAttribute('class');
    deleteItem = document.querySelectorAll(`.${clasname}`);
    deleteItem.forEach((item) => {
      item.remove();
    });
  }
  count--;

  // ----------------- emove from localstorage ------------------

  deleteItem.forEach((item, index) => {
    switch (index) {
      case 1:
        removeTasksFromLS(item);

      case 2:
        removeDescsFromLS(item);

        break;
    }
  });
}

//---- adding note to the local storage---
function addToLocalStorage(task, desc, num) {
  if (task !== '') {
    // get task from ls
    let tasks = getTaskFromLocalStorage();
    //add new task to the tasks array
    tasks.push(task);
    // add new task array to the local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // //*********************************************************
  if (desc !== '') {
    //get descs form ls
    let descs = getDescFromLocalStorage();
    // add new desc to the descs array
    descs.push(desc);
    //add new descs array to the  local storage
    localStorage.setItem('descs', JSON.stringify(descs));
  }
 
}

//---get tasks from local storage-----
function getTaskFromLocalStorage() {
  //get previous tasks from LS
  let note;
  // if exist convert to the array
  if (localStorage.getItem('tasks')) {
    note = JSON.parse(localStorage.getItem('tasks'));
  } else {
    //if note exist create empty array
    note = [];
  }
  return note;
}

//---get descriptions from local storage-----
function getDescFromLocalStorage() {
  //get previous desc from LS
  let note;
  // if exist convert to the array
  if (localStorage.getItem('descs')) {
    note = JSON.parse(localStorage.getItem('descs'));
  } else {
    //if not exist create empty array
    note = [];
  }
  return note;
}

function localStorageOnload() {
  let tasks = getTaskFromLocalStorage();
  let descs = getDescFromLocalStorage();

  num++;

  tasks.forEach((element,index) => {
    //----- add new row----------
    number_div.innerHTML += `<div class='delete${index}'>${count++}</div>`;
    task_div.innerHTML += `<div class='delete${index}'>${element}</div>`;
    check_div.innerHTML += `<div class='delete${index}'><input type='checkbox' id="ch${index}" />
    <label class="label" for="ch${index}"></label></div>`;
    date_div.innerHTML += `<div class='delete${index}'>${nowDate}</div>`;
    del_div.innerHTML += `<div class='delete${index}'><i style='font-size:18px' class='fas del'>&#xf2ed;</i></div>`;
  });

  descs.forEach((element, index) => {
    //----- add new row----------
    desc_div.innerHTML += `<div class='delete${index}'>${element}</div>`;
  });
}

// -----------------------------------------
function removeTasksFromLS(item) {
  let note = item.innerHTML;

  let tasks = getTaskFromLocalStorage();
  tasks.forEach((element, index) => {
    if (element === note) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// -----------------------------------------
function removeDescsFromLS(item) {
  let note = item.innerHTML;

  let descs = getDescFromLocalStorage();

  descs.forEach((element, index) => {
    if (element === note) {
      descs.splice(index, 1);
    }
  });

  localStorage.setItem('descs', JSON.stringify(descs));
}





