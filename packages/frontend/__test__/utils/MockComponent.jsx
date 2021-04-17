import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const MockComponent = ({ Component }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Component} />
      </Switch>
    </BrowserRouter>
  );
};

export default MockComponent;
