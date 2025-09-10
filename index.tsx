import { Buffer } from 'buffer';
// FIX: Cast window to `any` to attach the Buffer property for the polyfill.
// This resolves the TypeScript error "Property 'Buffer' does not exist on type 'Window'".
(window as any).Buffer = Buffer;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { NavProvider } from './context/NavContext';
import { ThemeProvider } from './context/ThemeContext';
import { GeminiProvider } from './context/GeminiContext';
import { I18nProvider } from './context/I18nContext';
import { VersionProvider } from './context/VersionContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <I18nProvider>
          <VersionProvider>
            <GeminiProvider>
              <NavProvider>
                <App />
              </NavProvider>
            </GeminiProvider>
          </VersionProvider>
        </I18nProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);