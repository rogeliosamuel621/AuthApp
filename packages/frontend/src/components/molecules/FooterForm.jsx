import React from 'react';
import '../../assets/styles/molecules/footerForm.css';

import { Subtitle, BlueText } from '../atoms';
import { SocialIcons } from '../molecules';

const FooterForm = ({ register, setMessage }) => {
  return (
    <div className="FooterForm-Container">
      {/* <Subtitle content="Or continue with these options" /> */}
      {/* <SocialIcons setMessage={setMessage} /> */}
      <div className="FooterForm-Question">
        <Subtitle
          content={register ? 'Already have an account?' : `Don't you have an account?`}
        />
        <BlueText
          content={register ? 'Login' : 'Register'}
          url={register ? '/login' : '/register'}
        />
      </div>
    </div>
  );
};

export default FooterForm;
