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

Question Heavyweight loomed large, its jabs and straights keeping me on the ropes. The last question, however, seemed like something I could respond to. Give the player a branch to start on, a branch to see, an NPC or two in line of sight, and let them explore. The other questions would answer themselves.

In this response, I realized that my artistic process is no different. Years of practice have given me intuition, but I still need to draw the wrist a few times to the best-looking pose. My mind has a vision, but it cannot see all the details. The same is true for game development. Intuition will come, but it will take the wrong code, the wrong art, and the wrong designs first.

I set out to build milestone one.

## The First Ascent

The goal of this milestone was threefold. It needed to:
1. Introduce the player to the mechanics and the world
2. Introduce me to level design that is more show than tell.
3. Determine how exactly the mechanics worked in an actual level.

First, how does a seed navigate a branch? It hops, of course.

INSERT HOPPING GIF

Where does it hop to? A point of interest! I added a bouncy mushroom and a higher branch with an NPC to talk to. Just jumping on the mushroom isn't good enough — the player needs to fall with enough speed, so that it trampolines them. Ideally, the player realizes this and gets to higher ground by walking further along the branch. From there, they glide, fall and bounce high enough to bridge the gap.  

INSERT ILLUSTRATION OF THE LEVEL

In order to get the player to make reasonable guesses, I placed the assets in such a way that  their eyes should naturally land on important landmarks as they navigated the space. One of my takeaways from *Metanoia* was that a puzzle's difficulty is strongly correlated with how "grouped" the pieces of the solution are. Solutions involving pieces of the board that were far apart spatially were harder to reason about. Similarly, I hoped that keeping the relevant branch, high ground, and mushroom visible at once would bring the solution about more easily. *Hoped*. We'll return to that.

While tweaking the lay of the level, I encountered friction. Each change of a branch and tune of a hitbox was an exercise in alt-tabbing between Godot, Blender, and the actual running game. I didn't know what part of the process should be done where — none of my previous games had 3D platforming levels and it showed. Question Heavyweight brought in its Question Thuglings (where's the ref?), who started going at my legs with insults thinly veiled as questions. "Do you even have a level-design workflow?" "Are you seriously making your collisions in the engine instead of in Blender?" They were annoying, but I suppose they had a point.

Unsurprisingly, spending time establishing good workflows makes iteration much easier. Godot has default nodes called CSG Nodes that are often used in prototyping, as they support the auto-generation of colliders from an amalgamation of shapes (**boolean geometry**) out of the box. I thought I'd use it to prototype the branches in the engine, but it turns out modeling the branches  and their collision shapes in Blender before importing them was much faster and yielded better immediate feedback. I always do my best to keep the workflow **non-destructive**, meaning that the steps compound in such a way that I always have easy access to a previous iteration, from which I can try something else. Think of them like adjustment layers — they modify the base layer to produce an output, without changing the base layer itself. I am wary that as the hero asset grows more complex and the aesthetic becomes more well-defined, keeping it non-destructive may not be possible. This would make future iterations more difficult, but I hope by that time, I have even better workflows and less cause to iterate so heavily.

IMAGE OF BLENDER TREE + COLLISION

After suppressing the Thuglings, I had a few branches, a small cast of characters, and a vignette staged. It was time for someone else to play the game.

## Playtesting

I temporarily suspended my bout with Question Heavyweight. I stepped out of the ring for the next contenders to enter — the player and my game. I slipped away to put money on the match. It's ten rounds, but I'm hoping it ends in four, with the player standing victorious. Why? Well, I'm genuinely interested in making a game that the player enjoys for its world and exploration, not for being a sweaty platformer where my ego reigns supreme. Spoiler: I lost a *lot* of money<sup>1</sup>.

Those who regularly play games beat it in seven or eight rounds, by which I mean they completed the vignette, albeit with some struggle. Those who didn't play many games were knocked out in five (opted to stop). I almost jumped in the ring myself. Instead, I took notes. Let's take a look.

### Born to do Precision Platforming, forced to do Cozy Exploration?

Players kept missing the branch they wanted to land on. The game's concept leaned naturally toward precision platformer. You are jumping from thin branch to thin branch, after all. But is that actually true, or are my default dials for fun biased toward skill checks because that's what I spent a decade playing<sup>2</sup>? It appears I suffer from a [lack of empathy](https://youtu.be/bF6ZxOMyXao?t=1140) toward casual gamers!<sup>3</sup>

What if the branches didn't become thin until the player was much higher up and more experienced? Surely the introduction to the game could do with more generous platforms. The players also missed landing on the mushroom repeatedly. Why did I make it so small?

Another consequence of the branches being so thin was that even when players landed on them safely, they'd slip off while hopping around. Watching it live felt terrible. The player was exasperated, and so was I. What if the player couldn't walk off the branch? Leaving would require jumping off, which would require intent. They could focus on exploration instead of being a tightrope walker.

Speaking of intent, I noticed a few players attempt to jump off a branch, only to end up slipping forward and gliding instead of jumping. Jumping and gliding share a button. A few players moved off the edge just before pressing it, so the game read their intended jump as a glide. They didn't realize what was happening, but it affected their ability to navigate. The fix might be a familiar platforming mechanic called "coyote time"<sup>4</sup>. Simply put, when jump is pressed, if the player was just on the floor a few frames before, let them jump! 

I must forgive them their eagerness.

### Visual Communication

This actually worked quite well — the players picked up pretty quickly where to go next. They also figured out how to get there, but given aforementioned difficulty with platforming, they occasionally lost confidence in their choice, thinking there might be another way. 

That being said, there is room for improvement. The mushroom has a speed threshold. If the player hits the mushroom faster than the threshold, they are catapaulted in the air. However, it's not clear if they met the threshold upon making contact, prompting questions statements like "I did what the bird said. Why didn't it work?" I don't know how best to communicate this information yet, though I have a few ideas.

After all this, Question Heavyweight doesn't isn't a heavyweight all the time. Instead, its weight fluctuates — playtesting answers some questions, but raises others. I eagerly await the inflection point, when more questions are answered than asked.

For now, I work toward milestone two (what is that exactly? Another question? Egads!)
 

1. No I didn't actually lose any money. Don't do sports betting, kids.
2. Smash Bros, Rocket League, Overwatch
3. It's ignorance, not malice, I assure you. I am very conscious of the games I choose to play these days — I try and curate the content I consume.
4. Aptly named after Wile E. Coyote, who is capable of many mid-air shenanigans soon after he steps off a ledge. I cannot find any official source for the term, however.












