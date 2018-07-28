import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import App from '../../shared/components/App';
import { Routes } from '../../shared/routes';

class Root extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <App>
          <Routes />
        </App>
      </BrowserRouter>
    );
  }
}

export default __DEV__ ? hot(module)(Root) : Root;
