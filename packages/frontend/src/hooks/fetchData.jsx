import { useState, useEffect } from 'react';
import Axios from 'axios';

import { API_URL } from '../config';
import { HandleHttpExceptions } from '../utils';

export const useFetchData = (token, url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ msg: '', status: false });
  const [unauthorized, setUnauthorized] = useState(true);
  const API_KEY = process.env.API_KEY;
  const headers = { headers: { api_key: API_KEY, token: token } };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return;
      }
      try {
        setLoading(true);
        const res = await Axios.get(`${API_URL}/${url}`, headers);
        setData(res.data.Data);
        setUnauthorized(true);
        setLoading(false);
      } catch (err) {
        setError(true);
        HandleHttpExceptions(err.message, setMessage);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, loading, message, unauthorized };
};
