import React from 'react';
import '../../assets/styles/atoms/dropDawnMenu.css';
import { Link } from 'react-router-dom';
import Cookie from 'universal-cookie';

const DropDawnMenu = () => {
  const cookie = new Cookie();
  function logOut() {
    cookie.remove('token');
    cookie.remove('FBUser');
    window.location.reload();
  }
  return (
    <div id="dropDawnMenu" className="DropDawnMenu-container">
      <Link to="/profile">My profile</Link>
      <hr />
      <p onClick={logOut}>LogOut</p>
    </div>
  );
};

export default DropDawnMenu;
