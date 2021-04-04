import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../../assets/styles/containers/registerForm.css';
import Axios from 'axios';
import Cookie from 'universal-cookie';

import { API_URL } from '../../config';
import { Input, TitleForm, FooterForm } from '../molecules/';
import { Submit, Message, Loader } from '../atoms/';
import { ErrorHandler, HandleHttpExceptions } from '../../utils/';

const RegisterContainer = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState({ status: false, to: '' });
  const [message, setMessage] = useState({ msg: '', status: false });
  const API_KEY = process.env.API_KEY;
  const cookie = new Cookie();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (password.length < 6) {
      ErrorHandler(setMessage, 'Password must have at least 6 characters');
      setLoading(false);
      return;
    }

    const data = { email, password };
    const headers = { headers: { api_key: API_KEY } };

    try {
      const res = await Axios.post(`${API_URL}/login`, data, headers);

      cookie.set('token', res.data.Data);
      setRedirect({ status: true, to: 'profile' });
    } catch (err) {
      HandleHttpExceptions(err.message, setMessage);
      setLoading(false);
      return;
    }
  }

  return redirect.status ? (
    <Redirect to={`/${redirect.to}`} />
  ) : (
    <>
      <Message error={message.status} message={message.msg} />
      <div className="RegisterContainer-container">
        <TitleForm register={false} />
        <form onSubmit={handleSubmit} className="RegisterForm-form">
          <Input email={true} setState={setEmail} />
          <Input email={false} setState={setPassword} />
          {loading ? <Loader /> : <Submit content="Login" />}
        </form>
        <FooterForm register={false} setMessage={setMessage} />
      </div>
    </>
  );
};

export default RegisterContainer;
