const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getExchangeRates: () => ipcRenderer.invoke('get-exchange-rates')
});