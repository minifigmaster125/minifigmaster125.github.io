
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
            <h1>Technology Experience</h1> 
          </div>
        </div>
        <p> * Adobe and Autodesk make downloading their logos difficult. </p>
        <ul  className = "skills">
          <li className = "skills-item ">
            <img src={require('../static/ruby.png')} alt="asf"></img>
            <p> Ruby on Rails </p>
          </li>
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
          <li className = "skills-item ">
            <img src={require('../static/blender.png')} alt="asf"></img>
            <p> Blender </p>
          </li>
          <li className = "skills-item ">
            <p> Photoshop </p>
          </li>
          <li className = "skills-item ">
            <p> Illustrator </p>
          </li>
          <li className = "skills-item ">
            <p> Maya </p>
          </li>
        </ul>
      </div> 
    );
  }

}
