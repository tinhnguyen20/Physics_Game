# Physics Engines Workshop

Hackers@Berkeley workshop for learning the basics of physics engines.

In this workshop, we'll be working with a relatively new physics engine called [p2.js](https://github.com/schteppe/p2.js). The [wiki](https://github.com/schteppe/p2.js/wiki) is super useful.

Prerequisites: prior programming experience (CS 61A concurrent OK), high-school level knowledge of mechanics.

## Why are we learning this?

There are **so** many physics engines out there: 2D, 3D, open, proprietary, written in Java, C++, C#, JavaScript, etc. Many of them share common features. We'll be covering concepts that show up in almost every physics engine you'll find these days.

Learning how to use p2.js is a secondary objective of this workshop. The main thing I hope you get out of this workshop is a design intuition informed by physics engine paradigms. By the end of this workshop, we'll be familiar with what physics engines generally look like.

## Bodies

### Dynamic bodies

Dynamic bodies are subject to forces and collide with other bodies. Do not directly set the velocity or position of these objects.

### Static bodies

These bodies are not subject to forces, but they still collide with other bodies. The ground is one common example of something that we want to be static. The ground should be solid, but shouldn't move when things fall on it.

### Kinematic bodies

These bodies can have their velocities edited directly.

### Sensors

This is a special kind of body that can "pass through" bodies, but can still tell you whether they are overlapping something. In p2.js, you can create sensors by setting a shape's `sensor` attribute to true and add it to the body. You can check collisions using a listener, which is covered below. 

## Applying force

In p2.js, you can apply force by calling the `applyForce` method on a body.

    body.applyForce([xPosition, yPosition], [xForce, yForce]);

## Handling collisions

In p2.js, you can create a collision listener for the world. Use the following syntax:

    world.on("beginContact", function(event) {
        /* Use event.bodyA and event.bodyB to get the bodies 
         * involved in the collision. */
    });

## Constraints

Constraints are user-imposed relationships between physical attributes (e.g. distance, rotation).

### Distance contraints

Imagine you are tying a rope between body A and body B. You have just created a distance constraint! Formally, a distance constraint makes sure the distance between two objects never exceeds a given distance.

## You're ready; start hacking!

Build something with what you've learned. Here are some ideas:

* Build tall structure
* Universe simulation
* Spaceship landing game
* Angry Birds clone
