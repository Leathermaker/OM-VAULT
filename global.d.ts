export {};

declare global {
  interface Window {
    electronAPI: {
      onRegisterData: (data: object) => Promise<void>;
    };
  }
}
