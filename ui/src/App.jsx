import React from 'react';
import Headers from './Layouts/Header/Header';
import Route from './routes';
import './App.css';

export default () => (
  <div className="App">
    <Headers />
    <Route className="Tippy-touch" />
  </div>
);
