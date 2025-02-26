"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  onRegisterData: (data) => electron.ipcRenderer.invoke("register-data", data),
  onLoginData: (data) => electron.ipcRenderer.invoke("login-data", data),
  isAuthenticated: (cb) => electron.ipcRenderer.once("isAuthenticated", (_, state) => cb(state)),
  removeListener: (channel) => electron.ipcRenderer.removeAllListeners(channel)
});
