---
title: Whirlbirding Devlog 001 - Birthing an Idea
date: 2026-08-01
description:  Not the a wrong way, not a right way.
tags: game dev
read_time: 6
published: false
---

There is a plethora of advice about how to find the right game idea, with "right" generally implying the game achieves some success metric that justifies resources it took to make. However, the claim of "right" can only be made in retrospect, after the game has met or exceeded expectations. Since I am at the beginning, I want to discuss how I arrived at my next game idea. It's righteousness will be decided much later <sup>1</sup>. 

## Whirlybirding!

**INSERT VIDEO HERE**

In *WhirlyBirding*, you are a samara seed! Most seeds drift away from their parent as soon as they can, but you've opted to climb the top of the tree before takeoff (for reasons that have yet to be made clear). Along the way you'll meet the critters who call this place home, as well as discover the history of your progenitor. Maybe you'll learn what being such a tree means, and go on to be something magnificent yourself. 


### Criteria

A part of my commitment to any project is deciding how I would like to stretch my current abilities.

For this game, I wanted a character. While [Metanoia](https://store.steampowered.com/app/4293060/Metanoia) was a well-scoped first step into building games, it's extreme simplicity left me wanting. With a character comes a few things:
* a character controller (what makes it feel really good?)
* a reason for being 
* a world to interact with

I wanted to learn what it's like to build a character controller that makes you want to play just from the way it looks and feels, regardless of what the game is like. [Gunfrog](https://store.steampowered.com/app/3173130/Gun_Frog/) makes me want to pick up the controller purely because the movement looks like sheer dumb fun.

A reason for being and a world to interact with go hand-in-hand as core components of worldbuilding and storytelling. Despite its humble appearance, I developed a soft world in Metanoia. Coupling the mechanics with the world and story was difficult but incredibly rewarding. This time I wanted to make it more tangible -- a first class object of the game, instead of a supporting actor.

A consequence of building a more tangible world is the demands it puts on content. Characters need art, animation, visual effects, sound effects, and maybe even voice acting. Being an indie means putting constraints so that fidelity of the game stays high while the production timeline stays sane. Some game's are really clever -- *Return of the Obra Dinn* has you investigate a nonlinear series of vignettes where each one is a snapshot in time. All the characters are posed in that snapshot and what you get is a method of storytelling that involves no animation at all. There is a significant gap in being able to pose 3D models vs being able to animate them convincingly, and Lucas Pope acknowledged that. 

However, I have been a long time dabbler of the arts, including animation. This world gives me a reason (read: excuse) to figure out how to model and animate a whole host of creatures. It's definitely against the traditional advice of cutting scope, but it's something I am genuinely looking forward to learning, so I eschew conventional wisdom. This is one of my stretch directions, after all.

### Inception

I have been on a nature reading kick in the last six months, and a lot of my ideas come from my reading. This game is no different. *This is How a Robin Drinks* is a collection of essays on urban nature, and I picked it up on a whim from the library. Under normal circumstances I would have passed it without another thought, but I had just finished a fiction writing course and was primed for short stories. In one essay, Joanna Brichetto shares the joy of throwing maple seeds and watching them spin as the gently float to the ground. Maple seeds are a kind of Samara, which is a family of winged fruit commonly known as helicopters or **whirlybirds**. 

My style of coming up with game ideas involves asking a lot of what-if questions. That, combined with interesting inputs, gives me a large enough pool to go swimming in. What if you were a whirlybird in a forest, with some level of self-determination? From here, I probe. What would you do? What would you want? What would get in your way? Why would you want it? What would it look like?

### Formulas, Brainfeel, and Heartfeel

Even with answers to these questions, a plethora actual games could be built. Not much had narrowed in that regard. In this next stage, I refer frequently to this [excellent talk](https://www.youtube.com/watch?v=bGsl3kvntbE) by Adam Saltsman on making small games. I have an idea, but I need to choose how I express it. In Adam's vocabulary I need to choose the *forumla* I actually ship. The idea has *heartfeel* -- I'm very drawn to the characterization and setting. *Brainfeel* then, is how it is materialized -- Adam mentions "Balatro meets Vampire Survivors" as a statement of brainfeel. 

My first formula involved the prime directive of the whirlybird - get away from the shade of its parent so it find a nice sunny spot to settle down in. How far should it go? As far as it can! This birthed an arcade-style game where you glide through the air and bounce off tree branches, propelling you like trampolines so you can keep going. The run is over when you touch the ground, and you are scored by how far you went. Sounds like a mobile game. I wasn't terribly enthusiastic <sup>2</sup> 

However, from experience I know I cannot out-think all my bad ideas. Maybe you can. I cannot.Instead, after a period of thinking comes a period of building. Through the  process of building, other formulas are brought forth. 

In about a week, I had something like this:

INSERT VIDEO

I thought it was legitmately fun to play despite it's simplicity, and my friends agreed. However, the I couldn't shake the feeling that it was too arcade-y. As I said, I wanted the opportunity for concrete worldbuilding and storytelling, and this again felt like an attempt at making those second-class citizens in the name of scope. I thought that maybe if I extended the reason, I would find more of a game. *While in the air, the seed realizes how little he knows of the world. It endeavors to ride the high winds until he's circled the globe.* In doing so, I might get the opportunity to create different realms, each with their own challenges, creatures, mood, etc.  

Yet, I was not excited. I do not find every part of the development journey exciting, but the formula I cannot compromise on. When self-imposed deadlines loom and I find a nasty bug at 2:30 AM, motivation will be at an all time low. Embers of the original formula, no matter how smoldered, will go a long way. For a formula I do not care for, no embers will remain. <sup>3</sup>.

I discussed the concept with a friend who shares some of my tastes. As a big fan of *A Short Hike*, she wondered if my premise and needs would be better suited to that kind of expression. A tiny open world with interesting movement. Together we envisioned the seed exploring a small wood. One of the trees is very large, and while exploring the wood, he makes it his goal to climb to the top of the tree. I figured the bouncing + gliding mechanic would still make a lot of sense here, and could be used for novel interactions. At this point, I started to see how I could build a story about the wood, the creatures in it, and why the whirlybird might want to climb a big tree.

At every decision, I must consider constraint in the context of my abilities. I was excited by the formula that was percolating, but a small forest did make me a little anxious. The map of *A Short Hike* is painstakingly designed, the NPCs authored such that the player is exposed to the right amount at the right time. I wracked my brain for a way to constrain the space. How many trees to explore? Maybe three well authored trees, each unique. In thought experiments like these, it helps to reach for extremes. What about just one?

An incredibly clear image blossomed in my mind. A single Yggdrasill-esque tree, something large and complex. You, the player, a seed of the Lower Branches, seeks to ascend it. My friend pitched in with the why: to understand what it means to be this kind of tree. Getting to some branches is obvious, others less so. Distinct features/sections of the tree have their own names. The NPCs (read: inhabitants) of the tree refer to the sections by name, as if they share a collective understanding of the their home. While you ascend, you learn about what it is you come from, and perhaps who it is you ought to be.  

This formula feels right <sup>4</sup>. Another prototype is due, which will tell me what limbs to cut off and what thoughts I graft on. As I  build, test, and gain clarity, the final version might look and sound nothing like what I've just posited. However, it's embers  will be floating around for a while.

---
1. Or lack thereof. In which case by reading this maybe you will learn how not to be. I aim to document, not to prescribe.
2. Mobile games can be interesting to build and interesting to play, don't get me wrong. However, this felt like a 3D flappy bird, and that's not my idea of a fun project.
3. Others might be more excited by the prospect of the game's success than the game itself. It's a perfectly valid way of being It is not for me.
4. I'm not a prophet. Books like *Production Point* by XYZ would tell you to not move out of the prototyping phase until you've built a prototype that shows clear promise with playtesters, to remove vibes from the equation (de-risk the project. I'm inclined to agree, but the equation is allowed to start with vibes.










