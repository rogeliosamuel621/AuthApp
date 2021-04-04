import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookie from 'universal-cookie';

import { Message } from '../components/atoms/';
import { Nav, EditPasswordForm } from '../components/containers/';
import { useFetchData } from '../hooks/fetchData';

const EditPassword = () => {
  const cookie = new Cookie();
  const token = cookie.get('token');
  const { data, message } = useFetchData(token, 'profile');
  return !token ? (
    <Redirect to="/login" />
  ) : (
    <>
      {message.status ? (
        <Message error={message.status} message={message.msg} />
      ) : null}
      <Nav authenticate={token ? true : false} profilePic={data.photo} />
      <EditPasswordForm token={token} />
    </>
  );
};

export default EditPassword;
