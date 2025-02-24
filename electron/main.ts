import { app, BrowserWindow,  ipcMain, } from "electron";
// import { createRequire } from 'node:module'
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";
import bcrypt from "bcryptjs";

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    minWidth: 500,
    minHeight: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.setMenu(null);
  const webContents = win.webContents;
  webContents.openDevTools();
  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

ipcMain.handle("register-data", async (_, data) => {
  const salt = await bcrypt.genSalt(9);
  const hashpassword = await bcrypt.hash(data.password, salt);
  const registerData = { name: data.name, email: data.email, password: hashpassword, phone: data.phone };
  const filePath = path.join(app.getPath("userData"), "userData.json");
  console.log(filePath);
  if (filePath) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(registerData, null, 2), "utf-8");
      return { success: true, message: "Data saved successfully!", path: filePath };
    } catch (error) {
      return { success: false, message: "Error saving data", error };
    }
  } else {
    return { success: false, message: "File save canceled" };
  }
});

ipcMain.handle("login-data", async(_,data)=>{
  const filePath = path.join(app.getPath("userData"), "userData.json");
  if (filePath) {
    try {
       const storedData  = fs.readFileSync(filePath, "utf-8");
       const userEmail = data.email;
       const userPassword = data.password; 
       const {email, password} = JSON.parse(storedData);
       const ispasswordmatch = await bcrypt.compare(userPassword, password)
       if(ispasswordmatch && userEmail == email){
       return win?.webContents.send("isAuthenticated", true);
       }else{
      return  win?.webContents.send("isAuthenticated", false);
       }
    } catch (error) {
      return { success: false, message: "Error saving data", error };
    }
  } else {
    return { success: false, message: "File save canceled" };
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
