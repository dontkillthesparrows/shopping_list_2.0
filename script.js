const button = document.querySelector("#submitButton");

function addValueToLocalStorage() {
  const key = Date.now();
  const inputValue = document.querySelector('#inputValue').value;
  localStorage.setItem(key, inputValue);
}


button.onclick = function(){addValueToLocalStorage()};