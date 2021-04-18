import React from 'react';
import '../../assets/styles/atoms/message.css';

const Message = ({ message, error }) => {
  function hideMessage() {
    document.getElementById('errorMessage').classList.remove('ShowMessage');
    document.getElementById('errorMessage').classList.add('HideMessage');
    setTimeout(() => {
      document.getElementById('errorMessage').style.top = '-70px';
    }, 500);
  }
  return (
    <div className="Message-Container">
      <div
        style={
          error ? { borderTop: '5px solid #d32626' } : { borderTop: '5px solid #79d70f' }
        }
        className="ErrorMessage"
        id="errorMessage"
        onClick={hideMessage}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export { Message };
