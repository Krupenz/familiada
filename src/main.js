const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const questions = require('../data/questions.json')
console.log("main process");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let roundTracker = 0;
let mainWindow;
let gameWindow;

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'pages/menu/menu.html'));
  mainWindow.webContents.openDevTools();
  return mainWindow;
};

const createGameWindow = () => {
  const gameWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  gameWindow.loadFile(path.join(__dirname, 'pages/game/game.html'));
  gameWindow.webContents.openDevTools();
  return gameWindow;
};

ipcMain.handle('startGame', () => {
  mainWindow.loadFile(path.join(__dirname, 'pages/controller/controller.html'));
  gameWindow = createGameWindow()
  console.log("started Game")
  gameWindow.once('ready-to-show', () => {
    gameWindow.webContents.send('getQuestion', questions.questions[roundTracker])
  });
  mainWindow.once('ready-to-show', () => {
    mainWindow.webContents.send('getQuestion', questions.questions[roundTracker])
  });
});

ipcMain.handle('sendAnswer', (event, answerId, teamId) => {
  if( answerId !== '-1' ) {
    gameWindow.webContents.send('revealAnswer', answerId, questions.questions[roundTracker]['answers'][answerId])
  } else {
    gameWindow.webContents.send('wrongAnswer', teamId)
  }
})

app.on('ready', function() {
  mainWindow = createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = createMainWindow();
  }
});