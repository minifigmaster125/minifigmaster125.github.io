
/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';

export default class extends Component {

  render() {
    return (
      <div className = "bodySection">
        <div className = "grid">  
          <div className = "Intro fill">
            <h1>Art</h1> 
          </div>
        </div>
        <div  className = "gallery">
          <div className = "gallery-item ">
            <img src={require('../static/art/mech_ninja.png')} alt="asf"></img>
            <p> Ruby on Rails </p>
          </div>
          <li className = "skills-item ">
            <img src={require('../static/HTML5_Logo.svg')} alt="asf"></img>
            <p> HTML5/CSS3 </p>
          </li>
          <li className = "skills-item ">
            <img src={require('../static/React.js_logo.svg')} alt="asf"></img>
            <p> React.js </p>
          </li>
          <li className = "skills-item">
            <img src={require('../static/python.svg')} alt="asf"></img>
            <p> Python </p>
          </li>
          <li className = "skills-item ">
            <img src={require('../static/cplusplus.png')} alt="asf"></img>
            <p> C++ </p>
          </li>
          <li className = "skills-item ">
            <img src={require('../static/scala.svg')} alt="asf"></img>
            <p> Scala </p>
          </li>
          <li className = "skills-item ">
            <img src={require('../static/android.png')} alt="asf"></img>
            <p> Android </p>
          </li>
          <li className = "skills-item ">
            <img src={require('../static/java.png')} alt="asf"></img>
            <p> Java </p>
          </li>
        </div>
      </div> 
    );
  }

}
