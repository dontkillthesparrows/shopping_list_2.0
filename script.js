window.onload = init;

function init() {
  if (storageAvaliable('localStorage')) {
    console.log('local storage avaliable');
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
  localStorage.setItem(key, inputValue);
}

button.onclick = function () {
  addValueToLocalStorage();
  createList();
};

function getItemsFromStorage() {
  const allItems = [];
  for (let i = 0; i < localStorage.length; i++) {
    allItems.push(localStorage.getItem(localStorage.key(i)));
  }
  return allItems;
}

function createList(callback) {
  callback().forEach((item) => {
    const listContainer = document.querySelector('#listContainer');
    listContainer.insertAdjacentHTML(
      'afterend',
      `
      <li>${item}<span>&#9850;</span></li>
    `
    );
  });
}

function removeItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}

createList(getItemsFromStorage);
