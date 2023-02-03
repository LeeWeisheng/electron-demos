document.getElementById("toggle-button").addEventListener("click", () => {
  window.theme.toggle().then((isDarkMode) => {
    document.getElementById("theme-label").innerText = isDarkMode
      ? "Dark"
      : "Light";
  });
});

document.getElementById("follow-system").addEventListener("click", () => {
  window.theme.system().then(() => {
    document.getElementById("theme-label").innerText = "System";
  });
});
