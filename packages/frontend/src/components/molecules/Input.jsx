import React from 'react';
import '../../assets/styles/molecules/input.css';

import EmailIcon from '../../assets/img/mail.svg';
import PasswordIcon from '../../assets/img/password.svg';

const Input = ({ email, setState }) => {
  return (
    <div className="Input-Container">
      <label>{email ? 'Email' : 'Password'}</label>
      <div className="Input-Content">
        <img
          src={email ? EmailIcon : PasswordIcon}
          alt={email ? 'Email icon' : 'Password icon'}
          width="30px"
          height="30px"
        />
        <input
          type={email ? 'email' : 'password'}
          placeholder={email ? 'Enter your email' : 'Enter your password'}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default Input;
