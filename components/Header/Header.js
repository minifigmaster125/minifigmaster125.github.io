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
        <a className="Header-link" href="/" onClick={Link.handleClick}>Home</a>
      </li>
    </ul>
  );
}

export default Header;
