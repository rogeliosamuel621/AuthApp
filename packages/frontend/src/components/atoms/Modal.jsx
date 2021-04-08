import React, { useState } from 'react';
import '../../assets/styles/atoms/modal.css';
import Axios from 'axios';

import { API_URL } from '../../config';
import { H2, Subtitle, Loader, Message, RemoveProfilePic } from './';
import DefaultImage from '../../assets/img/default_imagen.svg';
import {
  ErrorHandler,
  HandleHttpExceptions,
  SuccessMessage,
} from '../../utils/';
import path from 'path-browserify';

const Modal = ({ setModal, token, setProfilePic, profilePic }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ status: false, msg: '' });
  const API_KEY = process.env.API_KEY;

  async function handleChange(e) {
    e.persist();
    setLoading(true);
    const image = document.getElementById('file').files[0];

    if (!image) {
      ErrorHandler(setMessage, 'WRONG');
      setLoading(false);
      return;
    }

    const ext = path.extname(image.name);
    if (
      ext !== '.png' &&
      ext !== '.jpg' &&
      ext !== '.svg' &&
      ext !== '.jpeg' &&
      ext !== '.ico'
    ) {
      ErrorHandler(setMessage, 'Only images are allowed');
      setLoading(false);
      return;
    }
    const headers = { headers: { api_key: API_KEY, token: token } };
    const formDat = new FormData();
    formDat.append('image', image);

    try {
      const res = await Axios.post(
        `${API_URL}/profile/photo`,
        formDat,
        headers
      );

      setProfilePic(res.data.Data);
      SuccessMessage(setMessage, 'Profile pic updated successfully');
      setLoading(false);
    } catch (err) {
      HandleHttpExceptions(err.message, setMessage);
      setLoading(false);
      return;
    }
  }
  return (
    <div id="modal" className="Modal-Container">
      <Message error={message.status} message={message.msg} />
      <div className="Modal-Content">
        <div className="Modal-Content-Close">
          <a href="#" onClick={() => setModal(false)}>
            X
          </a>
        </div>
        <div className="Modal-Content-Text">
          <H2 content="Upload your photo" />
          <Subtitle content="Only jpg, png, svg..." />
        </div>
        <div className="Modal-Content-image">
          <img
            src={profilePic ? profilePic : DefaultImage}
            alt="Your profile pic"
            width="160px"
            height="160px"
          />
        </div>
        <div className="Modal-Content-Options">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="Modal-Content-input">
                <input
                  type="file"
                  onChange={handleChange}
                  id="file"
                  accept="image/*"
                />
                <p>Upload</p>
              </div>
              <RemoveProfilePic
                setLoading={setLoading}
                setMessage={setMessage}
                setProfilePic={setProfilePic}
                token={token}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
