import React from 'react';
import '../../assets/styles/molecules/socialIcons.css';
import FacebookLogin from 'react-facebook-login';
import Axios from 'axios';
import Cookie from 'universal-cookie';

import { API_URL, SOCIAL_REDIRECT } from '../../config';
import { ErrorHandler } from '../../utils';
import GoogleIcon from '../../assets/img/Google.svg';
import FacebookIcon from '../../assets/img/Facebook.svg';
import GithubIcon from '../../assets/img/Github.svg';
import TwitterIcon from '../../assets/img/Twitter.svg';

const SocialIcons = ({ setMessage }) => {
  const API_KEY = process.env.API_KEY;
  const headers = { headers: { api_key: API_KEY } };
  const cookie = new Cookie();

  const responseFacebook = async (res) => {
    console.log(res);

    const data = {
      email: res.email,
      name: res.name,
      photo: res.picture.data.url,
    };

    try {
      const API_res = await Axios.post(
        `${API_URL}/login/facebook`,
        data,
        headers
      );

      cookie.set('FBUser', API_res.data.Data);
      console.log(API_res.data.Data);

      window.location.href = '/profile';
    } catch (err) {
      console.log(err.message);
      if (err.message === 'Request failed with status code 400') {
        ErrorHandler(setMessage, 'That email is already registerd');
        return;
      }
    }
  };
  return (
    <div className="Register-SocialMedia-icons">
      <FacebookLogin
        redirectUri={`${SOCIAL_REDIRECT}/login`}
        appId={process.env.APP_ID_FACEBOOK}
        fields="name, email, picture"
        callback={responseFacebook}
        textButton="Facebook"
        cssClass="FacebookButton"
      />
    </div>
  );
};

export default SocialIcons;
