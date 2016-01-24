/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import './Header.scss';
import Link from '../Link';

function Header() {
  return (
    <ul className="Header">
      <li className="Header-item">
        <a className="Header-link" href="/tech" onClick={Link.handleClick}>Tech</a>
      </li>
      <li className="Header-item">
        <a className="Header-link" href="/art2d" onClick={Link.handleClick}>Art</a>
      </li>
      <li className="Header-item">
        <a className="Header-link" href="/projects" onClick={Link.handleClick}>Projects</a>
      </li>
      <li className="Header-item" id="Header-space">
        <a className="Header-link" href="/misc" onClick={Link.handleClick}>Misc</a>
      </li>
      <li className="Header-item">
        <a className="Header-link" href="/resume.pdf"  target="_blank">C.V.</a>
      </li>
      <li className="Header-item">
        <a className="Header-link" href="/" onClick={Link.handleClick}>Home</a>
      </li>
    </ul>
  );
}

export default Header;
