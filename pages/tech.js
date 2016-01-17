
/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';

export default class extends Component {

  render() {
    return (
      <div className = "grid">  
        <div className = "Intro fill">
          <h1>Tech Skills</h1> 
        </div>
        <ul  className = "skills">
          <li className = "skills-item">
            <p> RUBY ON RAILS </p>
          </li>
          <li className = "skills-item">
            <p> HTML5/CSS3 </p>
          </li>
          <li className = "skills-item">
            <p> REACT.JS </p>
          </li>
          <li className = "skills-item">
            <p> PYTHON </p>
          </li>
          <li className = "skills-item">
            <p> C++ </p>
          </li>
        </ul>
      </div>
     
    );
  }

}
