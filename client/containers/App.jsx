import React, { PropTypes } from 'react';
import App from '../components/App';

export default function Root({ children }) {
  if (!children) {
    return (
      <App />
    );
  }

  return (
    children
  );
}

Root.propTypes = {
  children: PropTypes.element
};
