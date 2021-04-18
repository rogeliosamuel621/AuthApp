import React, { useState } from 'react';
import '../../assets/styles/molecules/me.css';

import ArrowDawn from '../../assets/img/caret-down.svg';
import DefaultImage from '../../assets/img/default_imagen.svg';
import { DropDawnMenu } from '../atoms/';

const Me = ({ ProfilePic }) => {
  const [dropDawnMenu, setDropDawnMenu] = useState(false);
  function ShowOrHideMenu() {
    setDropDawnMenu(!dropDawnMenu);
  }
  return (
    <div className="Me-Container" onClick={ShowOrHideMenu}>
      <img
        className="Me-ProfilePic"
        src={ProfilePic ? ProfilePic : DefaultImage}
        alt="Your profile pic"
        width="40"
        height="40"
      />
      <img
        className="Me-ArrowDawn"
        src={ArrowDawn}
        alt="arrow dawn image"
        width="30"
        height="30"
      />
      {dropDawnMenu ? <DropDawnMenu /> : null}
    </div>
  );
};

export default Me;
