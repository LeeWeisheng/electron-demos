const path = require("path");
const { app, ipcMain, BrowserWindow, dialog, Menu } = require("electron");

try {
  require("electron-reloader")(module);
} catch {}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          label: "Increase",
          click: () => {
            mainWindow.webContents.send("update-counter", 1);
          },
        },
        {
          label: "Decrease",
          click: () => {
            mainWindow.webContents.send("update-counter", -1);
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  ipcMain.on("set-title", (event, title) => {
    BrowserWindow.fromWebContents(event.sender).setTitle(title);
  });

  ipcMain.handle("dialog:openFile", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (canceled) {
      return;
    } else {
      return filePaths[0];
    }
  });

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
