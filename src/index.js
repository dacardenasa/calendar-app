import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';

import './styles.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
  });
}

ReactDOM.render(
    <CalendarApp />,
  document.getElementById('root')
);
