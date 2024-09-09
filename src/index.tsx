import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './componets/error-boundary/ErrorBoundary';
import { keyboard } from './keyboard-setting';
import { input } from './app-handler/input';
import expressionExecute from './app-handler/calculate';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <App
        keyboard={keyboard}
        input={input}
        execute={expressionExecute}
      />
    </ErrorBoundary>
  </React.StrictMode>
);
