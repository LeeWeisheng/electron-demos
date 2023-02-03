const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("theme", {
  toggle: () => ipcRenderer.invoke("theme:toggle"),
  system: () => ipcRenderer.invoke("theme:system"),
});
