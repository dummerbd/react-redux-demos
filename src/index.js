import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const appEl = document.createElement('div');
  document.body.appendChild(appEl);
  appEl.id = 'app';

  render(<App />, appEl);
});
