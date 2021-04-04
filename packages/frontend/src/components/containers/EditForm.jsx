import React, { useState } from 'react';
import '../../assets/styles/containers/editForms.css';
import Axios from 'axios';

import { API_URL } from '../../config';
import {
  EditInputText,
  BlueText,
  EditInputImage,
  Submit,
  Modal,
  Message,
  Loader,
} from '../atoms';
import {
  ErrorHandler,
  HandleEditProfileExceptions,
  SuccessMessage,
} from '../../utils/';

const EditForm = ({ name, phone, email, profilePic, setProfilePic, token }) => {
  const [Name, setName] = useState(name || '');
  const [Phone, setPhone] = useState(phone || '');
  const [Email, setEmail] = useState(email || '');
  const [message, setMessage] = useState({ status: false, msg: '' });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const API_KEY = process.env.API_KEY;
  const headers = { headers: { api_key: API_KEY, token: token } };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (!Email) {
      ErrorHandler(setMessage, `Email doesn't have to be empty`);
      setLoading(false);
      return;
    }

    const data = {
      name: Name || '',
      phone: Phone || '',
      email: Email,
    };

    try {
      await Axios.put(`${API_URL}/profile`, data, headers);

      SuccessMessage(setMessage, 'Your data have been updated successfully');
      setLoading(false);
      return;
    } catch (err) {
      HandleEditProfileExceptions(err.message, setMessage);
      setLoading(false);
      return;
    }
  }

  return (
    <>
      {!modal ? <Message error={message.status} message={message.msg} /> : null}
      <main className="EditForm-main">
        <BlueText content="Back" url="/profile" />
        <div className="EditForm-Container">
          <form onSubmit={handleSubmit} className="EditForm-Form-Container">
            <EditInputImage profilePic={profilePic} setModal={setModal} />
            <EditInputText label="Name" setValue={setName} value={Name} />
            <EditInputText label="Phone" setValue={setPhone} value={Phone} />
            <EditInputText label="Email" setValue={setEmail} value={Email} />
            <div className="EditForm-submit">
              {loading ? <Loader /> : <Submit content="Save" />}
            </div>
          </form>
          <BlueText content="Change password" url="/password" />
        </div>
        <Modal
          setModal={setModal}
          token={token}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
        />
      </main>
    </>
  );
};

export default EditForm;
