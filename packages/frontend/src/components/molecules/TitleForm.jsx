import React from 'react';
import '../../assets/styles/molecules/titleForm.css';

import { H2, Subtitle } from '../atoms/';
const TitleForm = ({ register }) => {
  return (
    <div className="TitleForm">
      <H2 content={register ? 'Create your account' : 'Login'} />
      <Subtitle content="Fill the inputs" />
    </div>
  );
};

export default TitleForm;
