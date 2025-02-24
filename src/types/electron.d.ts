import { loginType, registerType } from "./auth.types";

export interface ElectronAPI {
    onRegisterData: (data: registerType) => Promise<void>;
    onLoginData: (data: loginType) => Promise<void>;
    isAuthenticated: (callback: (state: boolean) => void) => void;
    removeListener: (channel: string) => void;
  }
  
  declare global {
    interface Window {
      electronAPI: ElectronAPI;
    }
  }
  
  export {};
  