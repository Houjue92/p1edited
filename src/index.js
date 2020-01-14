import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/configureStore';
import App from './containers/App';

render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);

