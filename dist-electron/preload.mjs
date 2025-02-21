"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  onRegisterData: (data) => electron.ipcRenderer.invoke("register-data", data)
});
