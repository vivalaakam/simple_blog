import { PropTypes } from 'react';

export default function Layout({ children }) {
  return children;
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};
