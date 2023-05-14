// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('API', {
  startGame: () => ipcRenderer.invoke('startGame'),
  getQuestion: (callback) => ipcRenderer.on('getQuestion', callback),
  sendAnswer: (answerId) => ipcRenderer.invoke('sendAnswer', answerId),
  revealAnswer: (callback) => ipcRenderer.on('revealAnswer', callback),
  sendFail: (buttonId) => ipcRenderer.invoke('sendFail', buttonId)
});