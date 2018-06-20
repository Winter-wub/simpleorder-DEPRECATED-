import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(
  <AppWithRouter />,
  document.getElementById('root'),
);
registerServiceWorker();
