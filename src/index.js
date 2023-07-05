import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutesMain from './routes';
import './Resources/css/app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesMain />
  </React.StrictMode>
);

