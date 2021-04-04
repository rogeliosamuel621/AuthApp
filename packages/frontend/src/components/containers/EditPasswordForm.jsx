import React, { useState } from 'react';
import '../../assets/styles/containers/editPasswordForm.css';
import Axios from 'axios';

import { API_URL } from '../../config';
import { BlueText, EditInputText, Submit, Loader, Message } from '../atoms';
import {
  ErrorHandler,
  HandleHttpExceptions,
  SuccessMessage,
} from '../../utils/';

const EditPasswordForm = ({ token }) => {
  const [lastPassword, setLastPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ msg: '', status: false });
  const API_KEY = process.env.API_KEY;
  const headers = { headers: { api_key: API_KEY, token: token } };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (newPassword < 6 || lastPassword < 6 || confirmPassword < 6) {
      ErrorHandler(setMessage, 'Passwords should have at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      ErrorHandler(setMessage, `Passwords doesn't match`);
      setLoading(false);
      return;
    }

    const data = {
      currentPassword: lastPassword,
      newPassword: newPassword,
    };
    try {
      await Axios.put(`${API_URL}/profile/password`, data, headers);

      SuccessMessage(setMessage, 'Your password has been updated successfully');
      setLoading(false);
      return;
    } catch (err) {
      HandleHttpExceptions(err.message, setMessage);
      setLoading(false);
      return;
    }
  }

  return (
    <>
      <Message message={message.msg} error={message.status} />
      <section className="EditPasswordForm-Container">
        <BlueText content="Back" url="/edit" />
        <form onSubmit={handleSubmit} className="EditPasswordForm-Form">
          <EditInputText label="Last password" setValue={setLastPassword} />
          <EditInputText label="New password" setValue={setNewPassword} />
          <EditInputText
            label="Confirm password"
            setValue={setConfirmPassword}
          />
          <div className="EditPasswordForm-Submit">
            {loading ? <Loader /> : <Submit content="Save" />}
          </div>
        </form>
      </section>
    </>
  );
};

export default EditPasswordForm;
