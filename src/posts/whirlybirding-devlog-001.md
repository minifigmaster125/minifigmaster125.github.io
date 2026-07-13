---
title:  A Whimsical Controller - Whirlybirding Devlog 001
date: 2025-07-16
description: Fickle things, aren't they?
tags: game dev
read_time: 6
published: false
---

The way in which the character moves and responds to input says a lot about the game's genre. Competitive shooters must be snappy and responsive, as must precision platformers - think *Overwatch* or *Super Meat Boy*.  Other genres don't need that -- *Return of the Obra Dinn* is a puzzle game with a barebones walking controller (though being able to run around on deck would make the game a little easier). I've begun work on a game called *Whirlybirding*, in which you play as a  [samara](https://en.wikipedia.org/wiki/Samara_(fruit)) flying around a forest. It's a lightweight action platformer, so I decided on a reasonably tight and responsive control scheme. 

A layer of visual flair sits on top of the controls. [Secondary motion](https://en.wikipedia.org/wiki/Secondary_animation) is the physical movement of objects as a consequence of the primary action, like hair flowing when turning the head, and it can serve to sell the personality of the character (and setting). Not to be confused with [Secondary action](https://www.animationmentor.com/blog/secondary-action-the-12-basic-principles-of-animation/) which is just as important, but not the focus of this work. When I was deciding how my character controller should feel, I took inspiration from a little known game called [*GunFrog*](https://store.steampowered.com/app/3173130/Gun_Frog/). 

*GunFrog*  is third-person shooter/platformer. The controls are tight, but the secondary motion is **pure whimsy**. The way the frog flops all over the place when bouncing and shooting conveys an absolute nonsensical appeal that just makes me want to play the game. Inspired, I worked to replicate a similar feeling in my own character controller. This article describes how (this isn't a tutorial, it's a devlog).

<figure>
<img src="https://images.suchaaverchahal.com/gunfrog.webp"/>
<figcaption> It's a frog with a gun in it's mouth. </figure>
</figure>

### The Basics

Left, right, forward and backward. Basic inputs, basic outputs. All I had to decide was the speed. As a general principle, moving fast feels better than moving slow. Easy, no problem. Next question - should we have acceleration? Some games don't have them. *Overwatch* is has zero movement acceleration, allowing for effective a-d-a-d crouch strafing to dodge bullets. Acceleration is almost a must have to sell the movement of large vehicles, as buses do not stop on a dime. *Super Meat Boy* has acceleration as part of the blood-sliding mechanic (TODO), so the precision has as much to do with speed as it does positioning. The character is a light seed floating in the air. Some acceleration makes sense since, but I opted to make it rapid to make last second adjustments possible. 

The character has two modes -- gliding and falling. In gliding I opted to give the player a lot of horizontal control. The point is to allow the player to get from tree to tree and make quick adjustments when needed. Falling is the opposite, however. Control becomes limited, and if the player needs to make a larger change in position he needs to swap to gliding for a brief moment and then swap back to preserve falling momentum (the faster he is when he hits the branch, the higher he bounces back up, for now). After some playtesting and number-tweaking, the character felt good to control and fair to use. 

<figure>
<VIDEO
    controls
    playslinline
    preload="metadata"
    >
    <source
        src="https://images.suchaaverchahal.com/just-movin.mp4"
        type="video/mp4"
        />
</VIDEO>
<figcaption>  mmm gray boxes </figcaption>
</figure>

### The Spring

Whimsy and secondary motion involve many things, but for me the first thing that comes to mind is the effect that acceleration has on non-point masses. Said another way, when you slam your foot on the brake, your body leans forward significantly before coming to a stop. This **overshoot** can be replicated by a spring-dampening system. I used this to add some extra jiggle roll to the character whenever it starts and stops moving in a direction. If you took a classical mechanics physics class, you might remember Hooke's law, where `k` is the spring stiffness and x is the displacement of the spring from equilibrium (more on this in a bit):

```
F = -kx
```

Combined with a damping factor and the velocity (roll velocity) `c * v`, we get

```
F = -kx + cv
```

Given `F = ma`, if we assume a mass of 1, we arrive at

```
roll_acc = -k(current_roll - target_roll) + c(roll_velocity)
```

Now, what is `target_roll`? This was a little tricky for me. When the character is moving at max speed to the right, I want the body to roll 45 degrees to the left in response. This 45 degrees is designed, not simulated -- I don't have a drag force that acts proportionally opposite to velocity, and I have assumed a mass of 1. Instead, I've just posited that some signal strength of velocity will result in some amount of roll, up to a maximum of 45 degrees. Suppose the character is at rest, and the player inputs right. As soon as it reaches max velocity, the roll angle should be 45 degrees. **This is equilibrium**. Roll (`current_roll`) starts at 0 and must get to 45 (`target_roll`), but will overshoot since this is a spring-dampened system. The other end is more simple to reason about -- when velocity stops, we can expect rotation to settle at 0 (natural equilibrium).

Since `roll_velocity` starts at 0 and `k` and `c` are constants, solving for `roll_acc` is trivial. From that, the new roll velocity can be computed, as can the new current roll, where `delta` is the time the engine takes to process a frame:

```
roll_velocity += roll_accel * delta
current_roll += roll_velocity * delta
```

With some tweaking I arrived at a combination of stiffness and damping that added whimsical character without detracting from control, and it looks like this:

<figure>
<VIDEO
    controls
    playslinline
    preload="metadata"
    >
    <source
        src="https://images.suchaaverchahal.com/basic-controller-compressed.mp4"
        type="video/mp4"
        />
</VIDEO>
<figcaption> For testing purposes, it is not a seed in the air </figcaption>
</figure>

### The Spinning

The character is a gliding seed. It must spin. Compared to the spring, this part is trivial. When gliding, achieve a maximum spin velocity. When falling, reduce spin to zero based on a spin deceleration value, and when going back to gliding, achieve maximum spin velocity via a spin acceleration rate. It ends up looking like this:

<figure>
<VIDEO
    controls
    playslinline
    preload="metadata"
    >
    <source
        src="https://images.suchaaverchahal.com/just-spinning-compressed.mp4"
        type="video/mp4"
        />
</VIDEO>
<figcaption> It spins and it bounces and it is jiggly. </figcaption>
</figure>

### The Tumbling

When the character falls, it should tumble. The way in which it tumbles and recovers from tumbling provides a significant opportunity to design the whimsy of the overall character. 

#### Version 1 

The MVP of this design was for the seed to start rolling around a random axis, tumbling faster as the player gained downward velocity. When the player switches back to gliding, the seed snaps back to upright, regardless of current rotation and tumbling velocity. 

```
# simulate tumbling
seed.rotate(random_axis, tumble_velocity * delta)

# snap back
seed.quaterion = seed.quaterion.slerp(Quaternion.IDENTITY, snap_speed * delta)
``` 

I won't say I'm afraid of quaternions, but I will say that I handle them with caution. I've spent quite a bit of time understanding them ([CHECK THIS OUT](simulation site)), but I prefer to use simple axis/angle/euler angles when I can. This, however, seemed to be a simple and straightforward use case: given any orientation, rotate the seed back to the default rotation. It worked well enough. 

#### Version 2

After the MVP was working, I pushed a little more. The seed shouldn't snap back as soon as it goes back to gliding. How fast it recalibrates should change based on how fast it is tumbling. Not only does it feel better, it looks more jiggly (there is joke to be made here about jiggle physics). So I introduced a tumble deceleration rate, and when the tumble velocity became low enough, i added the snap correction back to default. 

```
tumble_velocity -= tumbel_decel * delta
seed.rotate(axis, tumble_velocity * delta)

if tumble_velocity < THRESHOLD:
	seed.quaterion = seed.quaterion.slerp(Quaternion.IDENTITY, snap_speed * delta)
```

This worked better, but didn't look so great when the snap triggered while the seed was rotated far away from the default position. I opted to check the error angle. If it was too great, keep the tumbling going at some minimum until the angle passed the threshold, then snap. This ended up looking a lot better. 

<figure>
<VIDEO
    controls
    playslinline
    preload="metadata"
    >
    <source
        src="https://images.suchaaverchahal.com/tumble-v1.mp4"
        type="video/mp4"
        />
</VIDEO>
</figure>

#### Version 3

I could have stopped there, but I wanted to see what the code looked like when all rotations were computed with quaternions. The rotation every frame around a random axis can be encoded in a quaternion, so the new rotated position is simply `frame_quaternion * seed_quaternion`.  The rate of rotation is incorporated into the angle that defines the quaternion, namely `tumble_velocity * delta`. Godot has convenience functions for this (standing on the shoulders of  giants).

This version has no visual difference from the previous one, but the code is simpler to read.


### A Different Tumble

With all this I arrived at a controller that feels good to use, but also just watch. It embodies the nonsensical attitude I saw in *Gunfrog*, but there is one more thing I can tweak. Tumbling around a single axis, even with some perturbation, didn't feel quite right, so I tried a tumble that correlated more strongly with the spin. I figured it should look more like a top losing power -- it starts out vertical and, as the spin disappears, turns mostly into a flatspin.

Every frame, the body needs to do two things. First, it needs to rotate some number of degrees around the y axis ("the top spinning").  Second, it needs to lean further by some degrees ("the top falling, as it spins"). By describing the rotation in degrees, it became clear that I could capture the local up vector in polar coordinates, using θ and Φ.  This was easy to reason about, and the final result used some ancient trig: 
```
given polar coordinates (r, θ, Φ)

x = r * sin(Φ) * cos(θ)
y = r * sin(Φ) * sin(θ)
z = r * cos(Φ)

new_up = Vector3(x,y,z)
# captures the rotation that needs to occur this frame, from the current up
# (basis.y) to the new up.
frame_rotation = Quaternion(basis.y.normalized, new_up)

# quaternion multiplication performs the rotation.
rotation = frame_rotation * rotation
```

With this in place, I got a different sort of tumble:

<figure>
<VIDEO
    controls
    playslinline
    preload="metadata"
    >
    <source
        src="https://images.suchaaverchahal.com/tumble-v2.mp4"
        type="video/mp4"
        />
</VIDEO>
</figure>

##  Enough, for Now

This article got real technical, but the way things look is deeply intertwined with how they work, so I try not to shy away from it. I might tweak, mix, and match the tumble based on further experimentation. That being said, for now it is whimsical enough, and any revisitation should come after I've fleshed out other parts of this game. 

