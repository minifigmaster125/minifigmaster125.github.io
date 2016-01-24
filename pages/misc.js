
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
          <h1>The Place Things Go because Nowhere Else Fits</h1>
        </div>
        <div className = "content">
          <div id = "aboutSite">
            <h3> About this Site </h3>
            <p> 
              This site was made using simple HTML, CSS, and Javascript.
              Actually, it's a static page generated with React JS, with the help
              of the fantastic <a href="https://github.com/koistya/react-static-boilerplate">
              React Static BoilerPlate </a>. What's even cooler is that the site
              is mobile responsive, but is using a custom "grid" via the slick 
              <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/"> CSS Flexbox </a> 
              specification. It's not as robust as some grids out
              there, but it is very simple and does the job very well. Since this
              is a github page, you can check out how it's done. 
            </p>
          </div>
        </div>
      </div> 
    );
  }

}
