/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import './Navigation.scss';
import Link from '../Link';

function Navigation() {
  return (
    <ul className="Navigation" role="menu">
      <li className="Navigation-item hypertest">
        <a className="Navigation-link" href="/tech" onClick={Link.handleClick}>Tech</a>
      </li>
      <li className="Navigation-item">
        <a className="Navigation-link" href="/art" onClick={Link.handleClick}>Art</a>
      </li>
      <li className="Navigation-item">
        <a className="Navigation-link" href="/projects" onClick={Link.handleClick}>Projects</a>
      </li>
      <li className="Navigation-item">
        <a className="Navigation-link" href="/misc" onClick={Link.handleClick}>Misc</a>
      </li>
    </ul>
  );
}

export default Navigation;
