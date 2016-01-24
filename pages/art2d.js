
/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import Link from '../components/Link';

export default class extends Component {

  render() {
    return (
      <div className = "bodySection">
        <div className = "grid">  
          <h1 className = "col-3-5">Portfolio</h1> 
          <h3 className = "col-1-5 current"> 
            <a className="Navigation-link" href="/art2d" onClick={Link.handleClick}>2D Work</a>
          </h3>
          <h3 className = "col-1-5 "> 
            <a className="Navigation-link" href="/art3d" onClick={Link.handleClick}>3D Work</a>
          </h3>
          <p> A more in depth look at these pieces can be found at my <a href="https://minifigmaster125.artstation.com/"> ArtStation</a>. You can
          also check out my <a href="http://minifigmaster125.deviantart.com/"> DeviantArt</a> for sketches as WIP.</p>
        </div>
        <div  className = "gallery">
          <div className = "gallery-item ">
            <img src={require('../static/2dart/mech_ninja.png')} alt="asf"></img>
            <p> Cyber Ninja </p>
          </div>
          <li className = "gallery-item ">
            <img src={require('../static/2dart/sword.png')} alt="asf"></img>
            <p> Sword </p>
          </li>
          <li className = "gallery-item ">
            <img src={require('../static/2dart/MalePortrait.png')} alt="asf"></img>
            <p> Male Portrait, no reference model. </p>
          </li>
        </div>
      </div> 
    );
  }

}
