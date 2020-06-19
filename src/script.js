import { storageAvaliable } from './helperfunctions.js';

const input = document.getElementById('inputField');
const button = document.getElementById('submitButton');
const ul = document.getElementById('list');

window.onload = init;

function init() {
  if (storageAvaliable) {
    console.log('storage avaliable');
    createList(getAllItemsFromStorage());
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

  return allItems;
}

function appendListElement(id, value) {
  ul.insertAdjacentHTML(
    'beforeend',
    `<li id="${id}" class="list-item">${value}<span class="check-box"></span><span class="recycle">&#9850;</span></li>`
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

button.addEventListener('click', function (e) {
  e.preventDefault();

  if (input.value) {
    const key = Date.now();
    appendListElement(key, input.value);
    addItemToLocalStorage(key, input.value);
  }

  input.value = '';
});

document.addEventListener(
  'click',
  function (e) {
    if (!e.target.matches('.recycle')) return;
    e.preventDefault();
    removeListElement(e.target);
    console.log(e.target.parentElement.id);
    removeItemFromLocalStorage(e.target.parentElement.id);
  },
  false
);
