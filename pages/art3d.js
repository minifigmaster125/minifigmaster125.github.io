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
          <h3 className = "col-1-5"> 
            <a className="Navigation-link" href="/art2d" onClick={Link.handleClick}>Art</a>
          </h3>
          <h3 className = "col-1-5 current"> 
            <a className="Navigation-link" href="/art3d" onClick={Link.handleClick}>3D Work</a>
          </h3>
        </div>
        <div  className = "gallery">
          <div className = "gallery-item ">
            <img src={require('../static/3dart/beast_full_render.png')} alt="asf"></img>
            <p> Blue Beast. Fully rigged, utilizes normal map. 7400 quads. </p>
          </div>
        </div>
      </div> 
    );
  }

}
