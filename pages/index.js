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
      <div className = "Intro col-1-2">
        <h1>Hi, I'm Suchaaver Chahal.</h1>
        <p>I'm a senior studying Electrical Engineering In Computer Science at
        Berkeley. I'm deeply interested in applications of robotics and 
        signal processing, particularly involving medicine. I am also no 
        stranger to fullstack web development, having established a relationship
        with Rails in my high school years.
        However, I first picked up programming due to a fascination with 
        it's involvement in games, so it's only
        natural I run a <a href="http://www.indiebn.com">game development blog</a>.
        Somewhere along the line I developed an interest in the art side of 
        game development. As a result, you can see my <a href="/art">portfolio </a> 
        of both 2D and 3D pieces. When I'm not fiddling with 3D software or 
        coding in some manner, you might find me playing soccer or working out. 
        My strength routine is heavily influenced by a gymanstic rings strength
        program. It requires are great deal of muscle and joint strength as 
        well as flexibility, which I believe is an excellent mixture to keep limber
        and fit. 
        </p>
        
      </div>
      <div className = "Picture col-1-2">
        <p> I'm A MONSTER </p>
      </div>
      </div>
     
    );
  }

}
