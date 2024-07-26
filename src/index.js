import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { keyboard } from './keyboard-setting';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App
      keyboard={keyboard}
    />
  </React.StrictMode>
);
