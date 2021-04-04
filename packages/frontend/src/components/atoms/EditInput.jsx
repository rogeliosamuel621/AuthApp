import React from 'react';
import '../../assets/styles/atoms/editInput.css';

import DefaultImage from '../../assets/img/default_imagen.svg';

const EditInputText = ({ label, setValue, value, placeHolder }) => {
  return (
    <div className="EditInputText-Container">
      <label>{label}</label>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeHolder}
        value={value}
        required
      />
    </div>
  );
};

const EditInputImage = ({ profilePic, setModal }) => {
  return (
    <div className="EditInputImage-Container">
      <div className="EditInputImage-image">
        <a href="#modal" onClick={() => setModal(true)}>
          <img
            src={profilePic ? profilePic : DefaultImage}
            alt="Your profile pic"
            width="72px"
            height="72px"
          />
        </a>
      </div>
      <div className="EditInputImage-text">
        <p>Change your photo</p>
      </div>
    </div>
  );
};
export { EditInputText, EditInputImage };
