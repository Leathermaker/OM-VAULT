import { ipcRenderer, contextBridge } from "electron";
import { loginType, registerType } from "../src/types/auth.types";

contextBridge.exposeInMainWorld("electronAPI", {
 onRegisterData: (data: registerType) => ipcRenderer.invoke("register-data", data),
 onLoginData: (data: loginType) => ipcRenderer.invoke("login-data", data),
 isAuthenticated : (cb:(state:boolean)=>void)=> ipcRenderer.once("isAuthenticated", (_, state)=>cb(state)),
 removeListener: (channel: string) => ipcRenderer.removeAllListeners(channel),
});
