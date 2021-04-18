import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const MockComponent = ({ Component }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {Component}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default MockComponent;
