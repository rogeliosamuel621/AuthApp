import React from 'react';
import '../assets/styles/pages/main.css';

import { Nav } from '../components/containers/';
import { H1, Subtitle, PrimaryLink } from '../components/atoms/';

const Main = () => {
  return (
    <>
      <Nav />
      <div className="MainView-Content">
        <H1 content="AuthApp" />
        <Subtitle content="A web application where you can login in different ways" />
        <div className="MainView-PrimaryButton">
          <PrimaryLink content="Register" url="/register" />
        </div>
      </div>
    </>
  );
};

export default Main;
