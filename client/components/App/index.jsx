import React from 'react';
import { Link } from 'react-router';
import style from './App.scss';

export default function App() {
  return (
    <div className={style.App}>
      My app

      <Link to="/page1">Page1</Link>
      <Link to="/page2">Page2</Link>
      <Link to="/counter">Counter</Link>
    </div>
  );
}
