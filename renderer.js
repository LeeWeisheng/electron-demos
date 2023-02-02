const titleInput = document.getElementById("titleInput");
const titleButton = document.getElementById("titleButton");

titleButton.addEventListener("click", () => {
  window.desktop.setTitle(titleInput.value);
});

const fileButton = document.getElementById("fileButton");
const filePath = document.getElementById("filePath");

fileButton.addEventListener("click", () => {
  window.desktop.openFile().then((response) => {
    filePath.innerText = response;
  });
});

const counter = document.getElementById("counter");
window.desktop.handleCounter((event, value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  counter.innerText = newValue;
});
