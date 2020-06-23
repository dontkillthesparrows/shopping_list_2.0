import { storageAvaliable, sortById } from './helperfunctions.js';

const input = document.getElementById('input-field');
const ul = document.getElementById('list');

window.onload = init;

function init() {
  if (storageAvaliable) {
    console.log('storage avaliable');
    let list = getAllItemsFromStorage();
    let sorted = sortById(list);
    createList(sorted);
  } else {
    console.log('storage not avaliable');
  }
}

function createList(callback) {
  if (callback === []) return;

  callback.forEach((item) => appendListElement(item.key, item.value));
}

function getAllItemsFromStorage() {
  const allItems = [];

  for (let i = 0; i < localStorage.length; i++) {
    allItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  allItems.sort();

  return allItems;
}

function appendListElement(id, value) {
  ul.insertAdjacentHTML(
    'beforeend',
    `<li id="${id}" class="list-item"><span class="check-box">&#x2610</span>${value}<span class="recycle">&#9850;</span></li>`
  );
}

function removeListElement(element) {
  element.parentElement.parentNode.removeChild(element.parentElement);
}

function addItemToLocalStorage(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify({ key: key, value: value, done: false })
  );
}

function removeItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}

function updateStorage(key) {
  let item = JSON.parse(localStorage.getItem(key));
  item.done = item.done === false ? true : false;
  localStorage.setItem(key, JSON.stringify(item));
}

input.addEventListener('keydown', function (e) {
  if (event.keyCode === 13) {
    e.preventDefault();
    if (input.value) {
      const key = Date.now();
      appendListElement(key, input.value);
      addItemToLocalStorage(key, input.value);
    }

    input.value = '';
  }
});

document.addEventListener(
  'click',
  function (e) {
    if (!e.target.matches('.recycle')) return;
    e.preventDefault();
    removeListElement(e.target);
    removeItemFromLocalStorage(e.target.parentElement.id);
  },
  false
);

document.addEventListener('click', function (e) {
  if (!e.target.matches('.check-box')) return;
  e.preventDefault();
  let checkBoxClass = e.target.parentElement.getAttribute('class');
  if (checkBoxClass === 'list-item') {
    e.target.parentElement.setAttribute('class', 'list-item done');
    e.target.innerHTML = '&#9745';
  } else {
    e.target.parentElement.setAttribute('class', 'list-item');
    e.target.innerHTML = '&#x2610';
  }
  updateStorage(e.target.parentElement.id);
});
