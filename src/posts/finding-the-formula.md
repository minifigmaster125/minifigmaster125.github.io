---
title: Finding the Formula - Whirlybirding Devlog 001
date: 2026-08-07
description:  Not the wrong way, not the right way.
tags: game dev
read_time: 7
published: true
---

I've started building my next game, and I thought I'd share how I arrived at the idea. A lot has been written on the subject of finding the right game idea, usually through the lens of commercial success, but "right" is a claim that can only be made in retrospect. [Even successful devs don't get it right all the time](https://www.youtube.com/watch?v=s4k7yDfYx24). The best I can do as of now is follow my curiosity and intuition, sprinkled with wisdom from what I have read. Righteousness will have to be decided later<sup>1</sup>.

### The Pitch

In *Whirlybirding*, you are a samara seed! Most seeds drift away from their parent as soon as they can, but you've opted to climb to the top of the tree before takeoff (for reasons that have yet to be made clear). Along the way you'll meet the critters who call this place home, as well as discover the history of your progenitor. Maybe you'll learn what it means to be such a tree, and go on to be something magnificent yourself. 


### My Criteria 

Part of my commitment to any project is deciding how I would like to stretch my current abilities. For this game, I wanted a character. While [Metanoia](https://store.steampowered.com/app/4293060/Metanoia) was a well-scoped first step into building games, its simplicity left me wanting. With a character comes:

* a character controller (what makes it feel really good?)
* a reason for being 
* a world to interact with

Some games have a character controller that makes me want to play them purely because of how they look and feel, regardless of genre. [Gunfrog](https://store.steampowered.com/app/3173130/Gun_Frog/) does this. It looks like sheer dumb fun, and that's something I'd like to understand better.

<figure>
<img src="https://images.suchaaverchahal.com/gunfrog.webp"/>
<figcaption> It's a frog with a gun in its mouth. </figcaption>
</figure>

A reason for being and a world to interact with go hand-in-hand as core components of worldbuilding and storytelling. Despite its humble appearance, I developed a soft world in Metanoia. Coupling the mechanics with the world and story was difficult but incredibly rewarding. This time I yearned to create something less abstract — a first-class object of the game, instead of a supporting actor. The definition is broad, but I hope to present a clear fantasy for the player, something that Metanoia didn't do well. 

Building a tangible world places greater demands on content. Characters need art, animation, visual effects, sound effects, and maybe even voice acting. Flying solo means finding constraints that keep the game's fidelity high and production timeline sane. Some games are really clever — *Return of the Obra Dinn* has you investigate a nonlinear series of vignettes where each is a snapshot in time. Lucas Pope managed to avoid animation entirely while still telling a convincing story. However, I have been a longtime dabbler of the arts, including animation. I am excited by the prospect of learning how to model and animate the creatures that inhabit this world and thus accept the production risk.

### Inception

I have been on a nature reading kick in the last six months, and a lot of my ideas come from my reading. This game is no different. *This is How a Robin Drinks* is a collection of essays on urban nature, and I picked it up on a whim from the library. Under normal circumstances I would have passed it without another thought, but I had just finished a fiction writing course and was primed for short stories. In one essay, Joanna Brichetto shares the joy of throwing maple seeds and watching them spin as they gently float to the ground. Maple seeds are a kind of samara, which is a family of winged fruit commonly known as helicopters or **whirlybirds**. 

My style of coming up with game ideas involves asking a lot of what-if questions. That, combined with interesting inputs into my life, gives me a large enough pool to go swimming in. What if you were a whirlybird in a forest, with some level of self-determination? From there, I probed. What would you do? What would you want? What would get in your way? Why would you want it? What would it look like?

<figure>
<img src="https://images.suchaaverchahal.com/sketch_character.jpg" style="height:600px;" />
<figcaption>What if you were this guy?</figcaption>
</figure>

### Formulas, Brainfeel, and Heartfeel

Even with answers to these questions, a plethora of actual games could be built. Not much had narrowed in that regard. In this next stage, I referred frequently to this [excellent talk](https://www.youtube.com/watch?v=bGsl3kvntbE) by Adam Saltsman on making small games. I had an idea, but I needed to choose how to express it. In Adam's vocabulary, I needed to choose the *formula* I would actually ship. The idea had *heartfeel* — I was drawn to the characterization and setting. *Brainfeel* then, is how it is materialized. Adam mentions "Balatro meets Vampire Survivors" as an example. 

My first formula involved the prime directive of the whirlybird - get away from the shade of its parent so it can find a nice sunny spot to settle down in. How far should it go? As far as it can! This birthed an arcade-style game where you glide through the air and bounce off tree branches, propelling you like trampolines so you can keep going. The run is over when you touch the ground, and you are scored by how far you went. It sounded like a mobile game I used to play in middle school. I wasn't terribly enthusiastic<sup>2</sup>. 

However, from experience I know I cannot out-think all my bad ideas. After a period of thinking comes a period of building. Through the process of building, other formulas are brought forth. I made this:

<figure>
<VIDEO
    controls
    playsinline
    preload="metadata"
    >
    <source
        src="https://images.suchaaverchahal.com/just-spinning-compressed.mp4"
        type="video/mp4"
        />
</VIDEO>
<figcaption>Some gliding, some bouncing.</figcaption>
</figure>

It was fun, and my friends agreed. A ten-second sort of fun, however, and I couldn't shake the feeling that it was too arcade-y. I wanted the opportunity for concrete worldbuilding and storytelling, but this again felt like an attempt at making those second-class citizens in the name of scope. I thought that if I extended the reason, I would find more of a game. *While in the air, the seed realizes how little it knows of the world. It endeavors to ride the high winds until it has circled the globe.* In doing so, I might get the opportunity to create different realms, each with their own challenges, creatures, and mood.  

Yet, I was not excited. I do not find every part of the development journey riveting, but I cannot compromise on the formula itself. When self-imposed deadlines loom and I find a nasty bug at 2:30 AM, motivation might be at an all-time low. Embers of the original formula, no matter how smoldered, will go a long way. For a formula I do not care for, no embers will remain. 

I discussed the concept with a friend who shares some of my tastes. As a big fan of *A Short Hike*, she wondered if my premise and needs would be better suited to that kind of expression. A tiny open world with interesting movement and relatable characters. Together we envisioned the seed exploring a small wood. One of the trees is very large, and the seed decides to climb to the top. I figured the bouncing and gliding mechanics would still make a lot of sense here, and could be used for novel interactions. At this point, I started to see how I could build a story about the wood, the creatures in it, and why the whirlybird might want to climb a big tree.

 I was excited by the formula that was percolating, but a small forest made me a little anxious. The map of *A Short Hike* is painstakingly designed, with the NPCs authored such that the player is exposed to the right dosage at the right time. It seemed like a lot to design a forest well enough to keep the player engaged at every point. How different is each tree? Is it just the same with different characters? Is that fun? I wracked my brain for a way to constrain the space. How many trees to explore? Maybe three well authored trees, each unique. In thought experiments like these, it helps to reach for extremes. What about just one?

An incredibly clear image blossomed in my mind. A single Yggdrasill-esque tree, something large and complex. You, the player, a seed of the Lower Branches, seek to ascend it. I didn't quite have the why, but my friend pitched in: to understand what it means to be this kind of tree, before becoming one. Some puzzle platforming mechanics make the ascent require exploration, conversation, and thought. Distinct features/sections of the tree have their own names. The NPCs (read: inhabitants) of the tree refer to the sections by name, as they share a collective understanding of their home. While you ascend, you learn about what it is you come from, and perhaps who it is you ought to be.  

<figure>
<img src="https://images.suchaaverchahal.com/sketch_tree.jpg" style="height:600px;" />
<figcaption>A little inspiration</figcaption>
</figure>

This formula compels me. Another prototype is due, which will tell me what limbs to cut off and which thoughts I graft on. As I build, test, and gain clarity, the final version might look and sound nothing like what I've just posited. That's okay. For now, embers abound.

<figure>
<VIDEO
    controls
    playsinline
    preload="metadata"
    >
    <source
        src="https://images.suchaaverchahal.com/preview_prototype.mp4"
        type="video/mp4"
        />
</VIDEO>
<figcaption>Sneak peek</figcaption>
</figure>

---
1. It may not be right. In which case, by reading this maybe you will learn how not to start. I aim to document, not prescribe.
2. Mobile games can be fun, successful, and interesting to build. However, this felt like a 3D Flappy Bird, and that's not my idea of a fun project.










