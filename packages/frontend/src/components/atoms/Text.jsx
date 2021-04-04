import React from 'react';
import '../../assets/styles/atoms/text.css';
import { Link } from 'react-router-dom';

const H1 = ({ content }) => {
  return <h1 className="H1">{content}</h1>;
};

const H2 = ({ content }) => {
  return <h2 className="H2">{content}</h2>;
};

const Subtitle = ({ content }) => {
  return <p className="Subtitle">{content}</p>;
};

const TextField = ({ content }) => {
  return <p className="TextField">{content}</p>;
};

const BlueText = ({ content, url }) => {
  return (
    <Link className="BlueText" to={url}>
      {content}
    </Link>
  );
};

export { H1, H2, Subtitle, TextField, BlueText };
