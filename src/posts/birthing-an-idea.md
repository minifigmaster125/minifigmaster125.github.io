---
title: Whirlbirding Devlog 001 - Finding the Formula
date: 2026-08-01
description:  Not the a wrong way, not a right way.
tags: game dev
read_time: 6
published: false
---

I've started building my next game, and I thought I'd share how I arrived at the idea. A lot has been written on the subject of finding the right game idea, usually from the lens of commercial success, but "right" is a claim that can only be made in retrospect. The best I can do right now is follow my curiosity and intuition, sprinkled with wisdom from the web. Righteousness will have to be decided later<sup>1</sup>.

## Whirlybirding

**INSERT VIDEO HERE**

In *Whirlybirding*, you are a samara seed! Most seeds drift away from their parent as soon as they can, but you've opted to climb the top of the tree before takeoff (for reasons that have yet to be made clear). Along the way you'll meet the critters who call this place home, as well as discover the history of your progenitor. Maybe you'll learn what being such a tree means, and go on to be something magnificent yourself. 

### Criteria

A part of my commitment to any project is deciding how I would like to stretch my current abilities.

For this game, I wanted a character. While [Metanoia](https://store.steampowered.com/app/4293060/Metanoia) was a well-scoped first step into building games, its simplicity left me wanting. With a character comes:

* a character controller (what makes it feel really good?)
* a reason for being 
* a world to interact with

Some games have a character controller that makes me want to play them just from the way they look and feel, regardless of genre. [Gunfrog](https://store.steampowered.com/app/3173130/Gun_Frog/) does this. It just looks like sheer dumb fun, and that's something I'd like to understand better.

A reason for being and a world to interact with go hand-in-hand as core components of worldbuilding and storytelling. Despite its humble appearance, I developed a soft world in Metanoia. Coupling the mechanics with the world and story was difficult but incredibly rewarding. This time I yearned to create something less abstract -- a first class object of the game, instead of a supporting actor.

A consequence of building a tangible world is the demands it puts on content. Characters need art, animation, visual effects, sound effects, and maybe even voice acting. Being an indie means finding constraints that keep the fidelity of the game stays high while the production timeline stays sane. Some games are really clever -- *Return of the Obra Dinn* has you investigate a nonlinear series of vignettes where each is a snapshot in time. Lucas Pope managed to avoid animation entirely while still telling a convincing story. 

However, I have been a long time dabbler of the arts, including animation. This world gives me a reason (read: excuse) to figure out how to model and animate a whole host of creatures. It's definitely against the traditional advice of cutting scope, but it's something I am genuinely looking forward to learning, so I eschew conventional wisdom. This is one of my stretch directions, after all.

### Inception

I have been on a nature reading kick in the last six months, and a lot of my ideas come from my reading. This game is no different. *This is How a Robin Drinks* is a collection of essays on urban nature, and I picked it up on a whim from the library. Under normal circumstances I would have passed it without another thought, but I had just finished a fiction writing course and was primed for short stories. In one essay, Joanna Brichetto shares the joy of throwing maple seeds and watching them spin as the gently float to the ground. Maple seeds are a kind of Samara, which is a family of winged fruit commonly known as helicopters or **whirlybirds**. 

My style of coming up with game ideas involves asking a lot of what-if questions. That, combined with interesting inputs, gives me a large enough pool to go swimming in. What if you were a whirlybird in a forest, with some level of self-determination? From here, I probe. What would you do? What would you want? What would get in your way? Why would you want it? What would it look like?

### Formulas, Brainfeel, and Heartfeel

Even with answers to these questions, a plethora actual games could be built. Not much had narrowed in that regard. In this next stage, I refer frequently to this [excellent talk](https://www.youtube.com/watch?v=bGsl3kvntbE) by Adam Saltsman on making small games. I have an idea, but I need to choose how I express it. In Adam's vocabulary I need to choose the *forumla* I actually ship. The idea has *heartfeel* -- I'm very drawn to the characterization and setting. *Brainfeel* then, is how it is materialized -- Adam mentions "Balatro meets Vampire Survivors" as a statement of brainfeel. 

My first formula involved the prime directive of the whirlybird - get away from the shade of its parent so it find a nice sunny spot to settle down in. How far should it go? As far as it can! This birthed an arcade-style game where you glide through the air and bounce off tree branches, propelling you like trampolines so you can keep going. The run is over when you touch the ground, and you are scored by how far you went. Sounds like a mobile game. I wasn't terribly enthusiastic<sup>2</sup>. 

However, from experience I know I cannot out-think all my bad ideas. After a period of thinking comes a period of building. Through the  process of building, other formulas are brought forth. I made this:

INSERT VIDEO

I thought it was legitimately fun to play despite it's simplicity, and my friends agreed. However, the I couldn't shake the feeling that it was too arcade-y. As I said, I wanted the opportunity for concrete worldbuilding and storytelling, and this again felt like an attempt at making those second-class citizens in the name of scope. I thought that maybe if I extended the reason, I would find more of a game. *While in the air, the seed realizes how little he knows of the world. It endeavors to ride the high winds until he's circled the globe.* In doing so, I might get the opportunity to create different realms, each with their own challenges, creatures, mood, etc.  

Yet, I was not excited. I do not find every part of the development journey exciting, but the formula I cannot compromise on. When self-imposed deadlines loom and I find a nasty bug at 2:30 AM, motivation will be at an all time low. Embers of the original formula, no matter how smoldered, will go a long way. For a formula I do not care for, no embers will remain. 

I discussed the concept with a friend who shares some of my tastes. As a big fan of *A Short Hike*, she wondered if my premise and needs would be better suited to that kind of expression. A tiny open world with interesting movement. Together we envisioned the seed exploring a small wood. One of the trees is very large, and while exploring the wood, he makes it his goal to climb to the top of the tree. I figured the bouncing + gliding mechanic would still make a lot of sense here, and could be used for novel interactions. At this point, I started to see how I could build a story about the wood, the creatures in it, and why the whirlybird might want to climb a big tree.

At every decision, I must consider constraint in the context of my abilities. I was excited by the formula that was percolating, but a small forest did make me a little anxious. The map of *A Short Hike* is painstakingly designed, the NPCs authored such that the player is exposed to the right amount at the right time. I wracked my brain for a way to constrain the space. How many trees to explore? Maybe three well authored trees, each unique. In thought experiments like these, it helps to reach for extremes. What about just one?

An incredibly clear image blossomed in my mind. A single Yggdrasill-esque tree, something large and complex. You, the player, a seed of the Lower Branches, seeks to ascend it. My friend pitched in with the why: to understand what it means to be this kind of tree. Getting to some branches is obvious, others less so. Distinct features/sections of the tree have their own names. The NPCs (read: inhabitants) of the tree refer to the sections by name, as they share a collective understanding of their home. While you ascend, you learn about what it is you come from, and perhaps who it is you ought to be.  

This formula feels right. Another prototype is due, which will tell me what limbs to cut off and what thoughts I graft on. As I  build, test, and gain clarity, the final version might look and sound nothing like what I've just posited. However, its embers will persist.

---
1. It may not be right. In which case by reading this maybe you will learn how not to start. I aim to document, not to prescribe.
2. Mobile games can be fun, successful, and interesting to build. However, this felt like a 3D Flappy Bird, and that's not my idea of a fun project.










