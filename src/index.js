import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { keyboard } from './keyboard-handler/keyboard-setting';
import  {input} from './keyboard-handler/input';
import expressionExecute from './keyboard-handler/calculate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App
      keyboard={keyboard}
      input = {input}
      execute= {expressionExecute}
    />
  </React.StrictMode>
);
