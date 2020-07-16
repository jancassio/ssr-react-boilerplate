import React from "react";
import { Route, Switch } from "react-router";

import { About, Home, NotFound } from "./pages";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}
