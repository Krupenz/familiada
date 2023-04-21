const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('API', {
    getQuestion: (callback) => ipcRenderer.on('getQuestion', callback),
    revealAnswer: (callback) => ipcRenderer.on('revealAnswer', callback)
})
