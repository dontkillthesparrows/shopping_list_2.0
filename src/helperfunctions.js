export function storageAvaliable(type) {
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

export function sortById(arr) {
  let swapped;
  do {
    swapped = false;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].key < arr[i - 1].key) {
        let n = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = n;
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}
