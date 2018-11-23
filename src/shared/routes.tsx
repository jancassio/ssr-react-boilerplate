import * as React from 'react';
import { Route, Switch } from 'react-router';

import { About, Home, NotFound } from './pages';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
