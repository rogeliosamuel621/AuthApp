import React, { useState } from 'react';
import '../../assets/styles/containers/registerForm.css';
import Axios from 'axios';

import { API_URL } from '../../config';
import { Input, TitleForm, FooterForm } from '../molecules/';
import { Submit, Message, Loader } from '../atoms/';
import { ErrorHandler, HandleHttpExceptions, SuccessMessage } from '../../utils/';

const RegisterContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ msg: '', status: false });
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.API_KEY;

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
      const res = await Axios.post(`${API_URL}/register`, data, headers);

      const errorMessage = res.data.message;

      if (errorMessage === 'That email is already registered') {
        ErrorHandler(setMessage, errorMessage);
        setLoading(false);
        return;
      }

      SuccessMessage(setMessage, 'You have been registered successfully');
      setLoading(false);
      return;
    } catch (err) {
      HandleHttpExceptions(err.message, setMessage);
      setLoading(false);
    }
  }

  return (
    <>
      <Message message={message.msg} error={message.status} />
      <div className="RegisterContainer-container">
        <TitleForm register={true} />
        <form onSubmit={handleSubmit} className="RegisterForm-form">
          <Input email={true} setState={setEmail} />
          <Input email={false} setState={setPassword} />
          {loading ? <Loader /> : <Submit content="Create an account" />}
        </form>
        <FooterForm register={true} />
      </div>
    </>
  );
};

export default RegisterContainer;
