import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookie from 'universal-cookie';

import { Nav, MyInfo } from '../components/containers/';
import { Message } from '../components/atoms/';
import { useFetchData } from '../hooks/fetchData';

const Profile = () => {
  const cookie = new Cookie();
  const token = cookie.get('token');
  const FBUser = cookie.get('FBUser');
  const { data, loading, message } = useFetchData(
    token ? token : FBUser,
    'profile'
  );

  return !token && !FBUser ? (
    <Redirect to="/login" />
  ) : (
    <>
      <Message error={message.status} message={message.msg} />
      <Nav
        authenticate={token || FBUser ? true : false}
        profilePic={data.photo}
      />
      <MyInfo
        isFBUser={FBUser ? true : false}
        email={data.email}
        name={data.name}
        phone={data.phone}
        profilePic={data.photo}
        loader={loading}
      />
    </>
  );
};

export default Profile;
