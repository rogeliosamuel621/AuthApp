import React from 'react';
import '../../assets/styles/atoms/field.css';

import { Subtitle, TextField } from '../atoms';
import DefaultImage from '../../assets/img/default_imagen.svg';

const DataField = ({ field, data }) => {
  return (
    <div className="DataField-Container">
      <div className="DataField-Field">
        <Subtitle content={field} />
      </div>
      <div className="DataField-Data">
        <TextField content={data} />
      </div>
    </div>
  );
};

const ImageField = ({ profilePic }) => {
  return (
    <div className="ImageField-Container">
      <div>
        <Subtitle content="Photo" />
      </div>
      <div className="ImageField-profilePic">
        <img
          src={profilePic ? profilePic : DefaultImage}
          alt="ProfilePic"
          width="72px"
          height="72px"
        />
      </div>
    </div>
  );
};

export { DataField, ImageField };
