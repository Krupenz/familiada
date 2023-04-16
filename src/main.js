const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const generalMethods = require('./generalMethods');
console.log("main process");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let roundTracker = 0;
const questions = generalMethods.getQuestions('data/questions.json');
console.log(questions);

const createMainWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  console.log(path.join(__dirname, 'pages/menu/menu.html'));
  mainWindow.loadFile(path.join(__dirname, 'pages/menu/menu.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  ipcMain.handle('startGame', () => {
    // Create the browser window.
    mainWindow.loadFile(path.join(__dirname, 'pages/controller/controller.html'));
    const gameWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    })
    gameWindow.loadFile(path.join(__dirname, 'pages/game/game.html'));
    gameWindow.webContents.openDevTools();
    console.log("started Game")

    gameWindow.once('ready-to-show', () => {
        fs.readFile('data/questions.json', (err, data) => {
          const jsonData = JSON.parse(data);
          console.log(jsonData)
          gameWindow.webContents.send('getQuestion', jsonData.questions[roundTracker])
        });
    });
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
