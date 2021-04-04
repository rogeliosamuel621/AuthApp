import React, { useEffect, useState } from 'react';
import { HandleHttpExceptions } from '../utils';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookie from 'universal-cookie';

import { API_URL } from '../config';
import { Nav } from '../components/containers/';
import { EditForm } from '../components/containers/';
import { Loader, Message } from '../components/atoms/';

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ msg: '', status: false });
  const [profilePic, setProfilePic] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const cookie = new Cookie();
  const token = cookie.get('token', '');
  const API_KEY = process.env.API_KEY;
  const headers = { headers: { api_key: API_KEY, token: token } };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return;
      }
      try {
        setLoading(true);
        const res = await Axios.get(`${API_URL}/profile`, headers);
        setProfilePic(res.data.Data.photo);
        setName(res.data.Data.name);
        setPhone(res.data.Data.phone);
        setEmail(res.data.Data.email);
        setLoading(false);
      } catch (err) {
        HandleHttpExceptions(err.message, setMessage);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return !token ? (
    <Redirect to="/login" />
  ) : (
    <>
      {message.status ? (
        <Message error={message.status} message={message.msg} />
      ) : null}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Nav
            authenticate={token ? true : false}
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
          <EditForm
            email={email}
            name={name}
            phone={phone}
            token={token}
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
        </>
      )}
    </>
  );
};

export default EditProfile;
