/// <reference types="vite/client" />


declare global {
    interface Window {
      ReactNativeWebView: {
        postMessage: (message: string) => void;
        addEventListener: (
          event: string,
          callback: (event: MessageEvent) => void
        ) => void;
      };
    }
  }