import React from 'react';
import './assets/styles/app.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { API_URL } from './config';
import {
  Main,
  Register,
  Login,
  Profile,
  EditProfile,
  EditPassword,
} from './pages/';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />

        <Route exact path="/register" component={Register} />

        <Route exact path="/login" component={Login} />

        <Route exact path="/profile" component={Profile} />

        <Route exact path="/edit" component={EditProfile} />

        <Route exact path="/password" component={EditPassword} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
