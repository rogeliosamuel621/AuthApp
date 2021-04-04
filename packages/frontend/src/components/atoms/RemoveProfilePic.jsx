import React from 'react';
import Axios from 'axios';

import { API_URL } from '../../config';
import { HandleHttpExceptions, SuccessMessage } from '../../utils/';

const RemoveProfilePic = ({ token, setMessage, setLoading, setProfilePic }) => {
  const API_KEY = process.env.API_KEY;
  const headers = { headers: { api_key: API_KEY, token: token } };
  async function removeProfilePic() {
    setLoading(true);
    try {
      const res = await Axios.delete(`${API_URL}/profile/photo`, headers);

      setProfilePic('');
      SuccessMessage(setMessage, res.data.Message);
      setLoading(false);

      return;
    } catch (err) {
      HandleHttpExceptions(err.message, setMessage);
      return;
    }
  }

  return <button onClick={removeProfilePic}>Remove</button>;
};
export default RemoveProfilePic;
