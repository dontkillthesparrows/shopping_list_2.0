window.onload = init;

function init() {
  if (storageAvaliable('localStorage')) {
    console.log('local storage avaliable');
    createList(getAllItemsFromStorage());
  } else {
    console.log('local storage not avaliable');
  }
}

function storageAvaliable(type) {
  //function from MDN, using web storage API
  let storage;
  try {
    storage = window[type];
    let x = '_storage_test_';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (error) {
    return (
      error instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

const button = document.querySelector('#submitButton');

function addValueToLocalStorage() {
  const key = Date.now();
  const inputValue = document.querySelector('#inputValue').value;
  localStorage.setItem(
    key,
    JSON.stringify({
      key: key,
      value: inputValue,
      done: false,
    })
  );
  return key;
}

button.onclick = async function () {
  let key = await addValueToLocalStorage();
  let item = await getItemFromStorage(key);
};

function getAllItemsFromStorage() {
  const allItems = [];
  for (let i = 0; i < localStorage.length; i++) {
    allItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  return allItems;
}

function getItemFromStorage(key) {
  const item = JSON.parse(localStorage.getItem(localStorage.key(key)));
  return item;
}

function createList(callback) {
  console.log(callback);
  callback.forEach((item) => {
    appendToList(item);
  });
}

function appendToList(item) {
  const listContainer = document.querySelector('#list');
  listContainer.insertAdjacentHTML(
    'beforeend',
    `
    <li>${item.value}<span class="recycle">&#9850;</span></li>
  `
  );
}

function removeItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}

function removeListItem(element) {
  element.parentNode.removeChild(element);
}

document.addEventListener(
  'click',
  function (event) {
    if (!event.target.matches('.recycle')) return;
    event.preventDefault();
    console.log(event.target.parentElement);
    removeListItem(event.target.parentElement);
    removeItemFromLocalStorage(event.target.parentElement.id);
  },
  false
);
