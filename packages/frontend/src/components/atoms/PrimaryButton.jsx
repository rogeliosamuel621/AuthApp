import React from 'react';
import '../../assets/styles/atoms/primaryButton.css';
import { Link } from 'react-router-dom';

const PrimaryLink = ({ content, url }) => {
  return (
    <Link className="PrimaryLink" to={url}>
      {content}
    </Link>
  );
};

const Submit = ({ content }) => {
  return <input className="Submit" type="submit" value={content} />;
};

export { PrimaryLink, Submit };
