import React from 'react';
import '../../assets/styles/containers/nav.css';

import { H2, BlueText } from '../atoms/Text';
import { Me } from '../molecules/';

const Nav = ({ authenticate, profilePic }) => {
  return (
    <nav className="Nav-container">
      <div className="Nav-Logo">
        <H2 content="AuthApp" />
      </div>
      <div>
        {authenticate ? (
          <Me ProfilePic={profilePic} />
        ) : (
          <BlueText content="Login" url="/login" />
        )}
      </div>
    </nav>
  );
};

export default Nav;
