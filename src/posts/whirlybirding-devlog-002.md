---
title: The Question Heavyweight — Whirlybirding Devlog 002 
date: 2026-09-13
description: In which I talk about building the first milestone
tags: game dev
read_time: 6
published: false
---

I've been building *Whirlybirding* for a little over a month now.  

At first, I was cruising. I began, as one does, with what was most clear in my mind — a third-person character controller and the mechanics of bouncing and gliding. I slapped together a tree, dropped the player character in, and wandered around. Faced with the empty expanse of my virtual surroundings, I just couldn't make out what the world should look like. It became clear that my vision was blurry. I'm myopic, so this should have come as no surprise. I can tell the street sign is green, but don't ask me what it says. The same was true of my game.

What does the tree really look like? Can the player jump?  How far apart should the branches be?  Is climbing the tree more of a puzzle challenge or a skill challenge? What does the player actually gain from talking to NPCs? What's the first thing I can put in front of playtesters?

The Question Heavyweight loomed large, its jabs and straights keeping me on the ropes. The last question, however, seemed like something I could respond to. Give the player a branch to start on, a branch to see, an NPC or two in line of sight, and let them explore. The other questions would answer themselves.

In resolving to do this, I realized that my artistic process is no different. My years of practice have given me intuition, but I still need to draw the wrist a few times to find out which position I am most pleased with. My mind has a vision, but it cannot see all the details. The same is true for game development. I will develop intuition, no doubt, but it will take the wrong code, the wrong art, and the wrong designs first.

I set out to build milestone one.

## The First Ascent

The goal of this milestone was threefold. It needed to:
1. Introduce the player to the mechanics and the world
2. Introduce me to level design that is more show than tell.
3. Determine how exactly the mechanics worked in an actual level.

First, how does a seed navigate a branch? It hops, of course.

INSERT HOPPING GIF

Where does it hop to? A point of interest! I added a bouncy mushroom and a higher branch with an NPC to talk to. Just jumping on the mushroom isn't good enough — the player needs to fall with enough speed, so that the mushroom trampolines them. Ideally the player realizes this and gets to higher ground by walking further along the branch. From there, they glide, fall and bounce high enough to bridge the gap.  

INSERT ILLUSTRATION OF THE LEVEL

In order to get the player to make reasonable guesses, I placed the assets in such a way that  their eyes should naturally land on important landmarks as they navigated the space. One of my takeaways from making *Metanoia* was that a puzzle's difficulty is strongly correlated with how "grouped" the pieces of the solution are. Solutions involving pieces of the board that were far apart spatially were harder to reason about. Similarly, I hoped that keeping the relevant branch, high ground, and mushroom visible at once would bring the solution about more easily. *Hoped*. We'll return to that.

While tweaking the lay of the level, I began to struggle with friction in my process. Each change of a branch and tune of a hitbox took a little too much time. The Question Heavyweight brought in his Question Thuglings (where's the ref?), who started going at my legs with insults thinly veiled as questions. "Do you even have a level-design workflow?" "Are you seriously making your collisions in the engine instead of in Blender?" They were annoying, but I suppose they had a point.

Unsurprisingly, spending time establishing good workflows makes iteration much easier. I thought I'd use Godot's CSG node system to prototype the branches in the engine, but it turns out generating them and their collision shapes in Blender before importing them was much faster and yielded a more accurate experience. I am wary that as the hero asset grows more complex and the aesthetic becomes more well defined, I may not be able to keep the workflow non-destructive. This would make the iteration process more difficult, but I hope that by the time that's the case, I have even better workflows and less cause to iterate so heavily.

IMAGE OF BLENDER TREE + COLLISION

With some effort, I had a few branches, a small cast of characters, and a little challenge setup to get from NPC to NPC. It was time for someone else to play the game.

## Playtesting

My bout with Question Heavyweight was temporarily suspended. I stepped out of the ring for the next contenders to enter — the player and my game. While they got introduced, I left to put money on the match. It's ten rounds. I'm hoping it ends in four, with the player standing victorious. Why? Well, I'm genuinely interested in making a game that the player finds interesting for its world and exploration, not for being a sweaty challenge of precision platforming where my ego reigns supreme. Spoiler: I lost a *lot* of money.

Those that played a lot of games beat mine in seven or eight rounds. A few went all ten rounds and only won by decision. Those that didn't play many games were knocked on in about five or six rounds. I almost jumped in the ring myself. Instead, I took notes. Let's take a look.

### Born to do Precision Platforming, forced to do Cozy Exploration

Players kept missing the branch they wanted to land on. The game's concept leaned naturally in the directly of precision platformer. You are jumping from thin branch to thin branch, after all. But is that actually true, or are my default dials for fun biased toward skill checks because that's what I spent a decade playing<sup>1</sup>? It appears that I suffer from a [lack of empathy](https://youtu.be/bF6ZxOMyXao?t=1140) toward casual gamers, which I apologize for and seek to change.

What if the branches weren't thinner until the player was much higher up and more experienced? Surely the introduction to the game could do with more generous platforms. The players also missed landing on the mushroom enough times for me to ask myself why I made it so small.

Another consequence of the branches being so thin is that even when players landed on it safely, they'd slip off while hopping around. Watching it felt like a Dark Souls level of punishment. What if the player couldn't walk off the branch? Leaving would require jumping off, which would require intent. They could focus on exploring the branch instead of being a tightrope walker.

Speaking of intent, I noticed a few players attempt to jump off a branch, only to end up slipping forward and gliding instead of jumping. The button to glide and jump are the same, the action changes based on whether they are in the air or on the ground. By holding forward just before jumping, they slip off the branch and immediately enter the `FALLING` state, so that the jump actually registers as a state change to `GLIDING`. 

They didn't realize what was happening, but it affected their ability to navigate. The fix is a very common game mechanic in most platformers called "coyote time"<sup>2</sup>. Simply put, when jump is pressed, if the player was just on the floor a few frames before, perform the jump action instead of whatever action the button would have normally performed.
### Visual Communication

This actually worked quite well. The players picked up pretty quickly where to go next. They also figured out how to get there, but given aforementioned issues with precision platforming they occasionally lost confidence in their choice, instead thinking there was another way. 

That being said, I could see some improvements. The mushroom has a speed threshold. If the player hits the mushroom faster than the threshold, they are catapaulted in the air. However, it's not clear if they've met the threshold before making contact, adding to the uncertainty when nothing spectacular happens. I don't know what the best way to communicate this information is yet, though I have a few ideas.

After all this, Question Heavyeight doesn't actually appear to be a heavyweight all the time. Instead, his weight fluctuates — the answers I find through playtesting cause him to lose some weight. At the same time, however, playtesting asks even more questions, and I find him even more dangerous than before. I don't fret, however. I've seen him diminish once, I can make it happen again. There will be an inflection point where more questions are answered then asked. When that time comes he will no longer have the the advantage, and I will move with swift certainty. For now, I work toward milestone two (what is that exactly? Another question? Egads!!)
 

1. Smash Bros, Rocket League, Overwatch
2. Aptly named after Wile E. Coyote, who is capable of many mid-air shenanigans soon after he steps off a ledge. I cannot find any official source for the term, however.












