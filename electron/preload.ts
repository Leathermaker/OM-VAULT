import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
 onRegisterData: 
 (data:object)=>
  ipcRenderer.invoke("register-data", data) ,
});
