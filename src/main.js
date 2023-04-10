const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

console.log("main process");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let roundTracker = 0;
fs.readFile('data/questions.json', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const jsonData = JSON.parse(data);
  console.log(jsonData);
});

const createControllerWindow = () => {
  // Create the browser window.
  const controllerWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'controllerPreload.js'),
    },
  });

  // and load the index.html of the app.śśś
  controllerWindow.loadFile(path.join(__dirname, 'controller.html'));

  // Open the DevTools.
  controllerWindow.webContents.openDevTools();
};

ipcMain.handle('startGame', () => {
  // Create the browser window.
  const gameWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'gamePreload.js'),
    },
  })
  gameWindow.loadFile(path.join(__dirname, 'game.html'));
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


// ipcMain.handle('getNextQuestion' = (question) => {

// });



const sendAnswer = (answerId) => {
  ipcMain.send('sendAnswer', (answerId) => {
    //fetch click from controollerRenderer
})
};


const nextRound = () => {
ipcMain.send(nextQuestion)
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createControllerWindow);

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
    createControllerWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
