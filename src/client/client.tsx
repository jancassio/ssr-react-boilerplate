import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Root } from './components';

ReactDOM.hydrate(
  <Root />,
  document.getElementById('root'),
);
